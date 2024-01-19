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
	var salons []models.Salon
	db.Find($salons)
	c.JSON(http.StatusOk, gin.H{"data": salons})
}

func CreateSalon(){}

func UpdateSalon(){}

func DeleteSalon(){}
