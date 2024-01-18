package routes

import (
	controller "backend/controllers"
	"github.com/gin-gonic/gin"
	"github.com/ksrof/yummybook-api/auth"
)

func AuthRouter(r *gin.Engine) {
	incomingRoutes.use(middleware.AuthMiddleware())
	incomingRoutes.POST("/users", controller.CreateUser)
	incomingRoutes.GET("/users/:id", controller.GetUser)
	
}