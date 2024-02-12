package controllers

import (
	"backend/backend/database"
	models "backend/backend/models"
	userModels "backend/backend/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func GetSalons(c *gin.Context) {
	db := database.Db
	var salons []models.Salon
	if err := db.Find(&salons).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": salons})
}

func CreateSalon(c *gin.Context) {
	db := database.Db
	user_id, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	var salon models.Salon

	c.BindJSON(&salon)
	if salon.Name == "" || salon.Email == "" || salon.Address == "" || salon.Phone == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Name, Email, Address, and Phone are required"})
		return
	}
	salon.UserID = user_id.(uint)
	db.Create(&salon)
	c.JSON(http.StatusOK, gin.H{"data": salon})
}

func UpdateSalon(c *gin.Context) {
	db := database.Db
	id := c.Param("id")

	var salon models.Salon
	user_id, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	if err := db.First(&salon, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Salon not found"})
		return
	}

	if salon.UserID != user_id {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	if err := c.BindJSON(&salon); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	salon.UpdatedAt = time.Now()
	db.Save(&salon)
	c.JSON(http.StatusOK, gin.H{"data": salon})
}

func DeleteSalon(c *gin.Context) {
	db := database.Db
	id := c.Params.ByName("id")
	user_id, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	var salon userModels.Salon
	db.First(&salon, id)
	if salon.UserID != user_id {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	if salon.ID != 0 {
		db.Delete(&salon)
		c.JSON(http.StatusOK, gin.H{"data": true})
	} else {
		c.JSON(http.StatusNotFound, gin.H{"error": "Salon not found"})
	}
}

func GetSalon(c *gin.Context) {
	db := database.Db
	id := c.Params.ByName("id")
	var salon models.Salon
	if err := db.Preload("Services").First(&salon, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Salon not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": salon})
}

func GetMySalons(c *gin.Context) {
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
	c.JSON(http.StatusOK, gin.H{"data": salons})
}

func GetAllServices(c *gin.Context) {
	db := database.Db
	var services []models.Service
	if err := db.Find(&services).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": services})
}

func GetSalonServices(c *gin.Context) {
	db := database.Db
	salonId := c.Params.ByName("salonId")
	var salon models.Salon

	if err := db.Preload("Services").First(&salon, salonId).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Salon not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": salon.Services})
}

func GetSalonProfile(c *gin.Context) {
	db := database.Db
	id := c.Params.ByName("id")
	var salon models.Salon
	if err := db.Preload("Services").First(&salon, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Salon not found"})
		return
	}
	var user models.User
	if err := db.First(&user, salon.UserID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": gin.H{"salon": salon, "user": user}})
}
