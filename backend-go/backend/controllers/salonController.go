package controllers

import (
	"net/http"
	"time"
	"github.com/gin-gonic/gin"
	"backend/backend/database"
	"backend/backend/models"
)

func GetSalons(c *gin.Context){
	db := database.Db
	var salons []userModels.Salon
	db.Find(&salons)
	c.JSON(http.StatusOK, gin.H{"data": salons})
}

func CreateSalon(c *gin.Context){
	db := database.Db
	var salon userModels.Salon

	c.BindJSON(&salon)
	if salon.Name == "" || salon.Email == "" || salon.Address == "" || salon.Phone == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Name, Email, Address, and Phone are required"})
		return
	}

	db.Create(&salon)
	c.JSON(http.StatusOK, gin.H{"data": salon})
}

func UpdateSalon(c *gin.Context){
	db := database.Db
	id := c.Params.ByName("id")
	var salon userModels.Salon
	db.First(&salon, id)
	if salon.ID != 0 {
		var newSalon userModels.Salon
		c.BindJSON(&newSalon)
		result := userModels.Salon{
			ID:        salon.ID,
			Name:      newSalon.Name,
			Email:     newSalon.Email,
			UserID:    newSalon.UserID,
			CreatedAt: salon.CreatedAt,
			UpdatedAt: time.Now(),
			Address:   newSalon.Address,
			Phone:     newSalon.Phone,
		}
		db.Save(&result)
		c.JSON(http.StatusOK, gin.H{"data": result})
	} else {
		c.JSON(http.StatusNotFound, gin.H{"error": "Salon not found"})
	}
}

func DeleteSalon(c *gin.Context) {
	db := database.Db
	id := c.Params.ByName("id")
	var salon userModels.Salon
	db.First(&salon, id)
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
	var salon userModels.Salon
	db.First(&salon, id)
	c.JSON(http.StatusOK, gin.H{"data": salon})
}