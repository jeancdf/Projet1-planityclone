package routes

import (
	controller "backend/backend/controllers"
	"github.com/gin-gonic/gin"
	"backend/backend/middleware"
)

func UsersRouter(r *gin.Engine) {
	r.Use(authMiddleware.AuthMiddleware())
	r.POST("/users", controller.CreateUser)
	r.GET("/users/:id", controller.GetUser)
}
