package routes

import (
	controller "backend/controllers"
	"github.com/gin-gonic/gin"
	"github.com/ksrof/yummybook-api/auth"
)

func AuthRouter(r *gin.Engine) {
	authGroup := r.Group("/accounts")
	{
		authGroup.POST("/register", auth.Register)
		authGroup.POST("/login", auth.Login)
	}
}