package controllers

import (
	"backend/backend/database"
	models "backend/backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetReservations(c *gin.Context) {
	db := database.Db
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var salons []models.Salon
	if err := db.Where("user_id = ?", userID).Find(&salons).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var salonIDs []uint
	for _, salon := range salons {
		salonIDs = append(salonIDs, salon.ID)
	}

	var reservations []models.Reservation
	if err := db.Where("salon_id IN ?", salonIDs).Find(&reservations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reservations})
}

func CreateReservation(c *gin.Context) {
	user_id, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	db := database.Db
	var reservation models.Reservation
	if err := c.BindJSON(&reservation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	reservation.UserID = user_id.(uint)
	reservation.Status = nil
	db.Create(&reservation)
	c.JSON(http.StatusOK, gin.H{"data": reservation})
}

func GetReservation(c *gin.Context) {
	db := database.Db
	reservationID, _ := strconv.ParseUint(c.Param("reservationId"), 10, 32)
	var reservation models.Reservation
	if err := db.First(&reservation, reservationID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reservation})
}

func UpdateReservation(c *gin.Context) {
	db := database.Db
	reservationID, _ := strconv.ParseUint(c.Param("reservationId"), 10, 32)
	var reservation models.Reservation
	if err := db.First(&reservation, reservationID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}
	if err := c.BindJSON(&reservation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Save(&reservation)
	c.JSON(http.StatusOK, gin.H{"data": reservation})
}

func DeleteReservation(c *gin.Context) {
	db := database.Db
	reservationID, _ := strconv.ParseUint(c.Param("reservationId"), 10, 32)
	var reservation models.Reservation
	db.First(&reservation, reservationID)
	if reservation.ID != 0 {
		db.Delete(&reservation)
		c.JSON(http.StatusOK, gin.H{"data": true})
	} else {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
	}
}

func GetSalonReservations(c *gin.Context) {
	db := database.Db
	salonID, _ := strconv.ParseUint(c.Param("salonId"), 10, 32)
	var salon models.Salon
	if err := db.First(&salon, salonID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Salon not found"})
		return
	}
	var reservations []models.Reservation
	if err := db.Where("salon_id = ?", salonID).Find(&reservations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reservations})
}

func AcceptReservation(c *gin.Context) {
	db := database.Db
	salonID, _ := strconv.ParseUint(c.Param("salonId"), 10, 32)
	reservationID, _ := strconv.ParseUint(c.Param("reservationId"), 10, 32)

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var salon models.Salon
	if err := db.Where("id = ? AND user_id = ?", salonID, userID).First(&salon).Error; err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not authorized to modify this reservation"})
		return
	}

	var reservation models.Reservation
	if err := db.Where("id = ? AND salon_id = ?", reservationID, salonID).First(&reservation).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

	accepted := true
	reservation.Status = &accepted
	db.Save(&reservation)
	c.JSON(http.StatusOK, gin.H{"message": "Reservation accepted", "data": reservation})
}

// DeclineReservation updates the reservation status to declined
func DeclineReservation(c *gin.Context) {
	db := database.Db
	salonID, _ := strconv.ParseUint(c.Param("salonId"), 10, 32)
	reservationID, _ := strconv.ParseUint(c.Param("reservationId"), 10, 32)

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var salon models.Salon
	if err := db.Where("id = ? AND user_id = ?", salonID, userID).First(&salon).Error; err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not authorized to modify this reservation"})
		return
	}

	var reservation models.Reservation
	if err := db.Where("id = ? AND salon_id = ?", reservationID, salonID).First(&reservation).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

	declined := false
	reservation.Status = &declined
	db.Save(&reservation)
	c.JSON(http.StatusOK, gin.H{"message": "Reservation declined", "data": reservation})
}

func GetMyReservations(c *gin.Context) {
	db := database.Db
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var reservations []models.Reservation
	if err := db.Where("user_id = ?", userID).Find(&reservations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reservations})
}

func GetMySalonsReservations(c *gin.Context) {
	db := database.Db
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var salons []models.Salon
	if err := db.Where("user_id = ?", userID).Find(&salons).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var salonIDs []uint
	for _, salon := range salons {
		salonIDs = append(salonIDs, salon.ID)
	}

	if len(salonIDs) == 0 {
		c.JSON(http.StatusOK, gin.H{"data": []models.Reservation{}})
		return
	}

	var reservations []models.Reservation
	if err := db.Where("salon_id IN (?)", salonIDs).Find(&reservations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reservations})
}
