package routes

import (
	controller "backend/backend/controllers"
	"github.com/gin-gonic/gin"
)

func AuthRouter(r *gin.Engine) {
	authGroup := r.Group("/accounts")
	{
		authGroup.POST("/register", controller.CreateUser)
		authGroup.POST("/login", controller.Login)
	}
}