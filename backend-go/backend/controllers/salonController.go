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
	db.Find($salons)
	c.JSON(http.StatusOk, gin.H{"data": salons})
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

func UpdateSalon(){}

func DeleteSalon(){}
