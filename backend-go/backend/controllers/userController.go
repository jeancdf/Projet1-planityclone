package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"backend/backend/database"
	"backend/backend/models"
	"backend/backend/middleware"
	"backend/backend/helpers"
	"golang.org/x/crypto/bcrypt"
	"strings"
)

func GetUsers(c *gin.Context) {
	db := database.Db
	var users []userModels.User
	db.Find(&users)
	c.JSON(http.StatusOK, gin.H{"data": users})
}

func CreateUser(c *gin.Context) {
	db := database.Db
	var user userModels.User

	c.BindJSON(&user)
	if user.Username == "" || user.Email == "" || user.Password == "" || user.Roles == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Username, Email, Password, and Roles are required"})
			return
	}

	validRoles := []string{"customer", "client"}
	roles := strings.Split(user.Roles, ",") 

	for _, role := range roles {
			if !authHelper.Contains(validRoles, role) {
					c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Role. Allowed roles are customer or client"})
					return
			}
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
			return
	}

	user.Password = string(hashedPassword)
	user.Roles = strings.Join(roles, ",")
	db.Create(&user)
	c.JSON(http.StatusOK, gin.H{"data": user})
}

func UpdateUser(c *gin.Context) {
	db := database.Db
	id := c.Params.ByName("id")
	var user userModels.User
	db.First(&user, id)
	if user.ID != 0 {
		var newUser userModels.User
		c.BindJSON(&newUser)
		result := userModels.User{
			ID:        user.ID,
			Username: newUser.Username,
			Email:     newUser.Email,
			Password:  newUser.Password,
			Roles: newUser.Roles,
		}
		db.Save(&result)
		c.JSON(http.StatusOK, gin.H{"data": result})
	} else {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
	}
}

func DeleteUser(c *gin.Context) {
	db := database.Db
	id := c.Params.ByName("id")
	var user userModels.User
	db.First(&user, id)
	if user.ID != 0 {
		db.Delete(&user)
		c.JSON(http.StatusOK, gin.H{"data": true})
	} else {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
	}
}

func Login(c *gin.Context) {
	db := database.Db
	var user userModels.User
	var userLogin userModels.User
	c.BindJSON(&userLogin)
	db.Where("email = ?", userLogin.Email).First(&user)
	if user.ID == 0 {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
	}
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userLogin.Password))
	if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
			return
	}
	token, err := authMiddleware.GenerateToken(user.ID)
	if err != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
			return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}

func GetUser(c *gin.Context) {
	db := database.Db
	id := c.Params.ByName("id")
	var user userModels.User
	db.First(&user, id)
	c.JSON(http.StatusOK, gin.H{"data": user})
}