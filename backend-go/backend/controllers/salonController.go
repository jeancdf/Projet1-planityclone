package controllers

import (
	"backend/backend/database"
	models "backend/backend/models"
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
	var salon models.Salon

	c.BindJSON(&salon)
	if salon.Name == "" || salon.Email == "" || salon.Address == "" || salon.Phone == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Name, Email, Address, and Phone are required"})
		return
	}

	db.Create(&salon)
	c.JSON(http.StatusOK, gin.H{"data": salon})
}

func UpdateSalon(c *gin.Context) {
	db := database.Db
	id := c.Param("id")

	var salon models.Salon
	if err := db.First(&salon, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Salon not found"})
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
	var salon models.Salon
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
	var salon models.Salon
	db.First(&salon, id)
	c.JSON(http.StatusOK, gin.H{"data": salon})
}
