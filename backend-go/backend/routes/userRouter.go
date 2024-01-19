package routes

import (
	controller "backend/backend/controllers"
	"github.com/gin-gonic/gin"
	"backend/backend/middleware"
)

func UsersRouter(r *gin.Engine) {
	authGroup := r.Group("/api")
	authGroup.Use(authMiddleware.AuthMiddleware())
	{
		authGroup.POST("/users", controller.CreateUser)
		authGroup.POST("/users/:id", controller.GetUser)
	}
}
