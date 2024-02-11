package routes

import (
	controller "backend/backend/controllers"
	authMiddleware "backend/backend/middleware"

	"github.com/gin-gonic/gin"
)

func SalonRouter(r *gin.Engine) {
	authGroup := r.Group("/api")
	authGroup.Use(authMiddleware.AuthMiddleware())

	// Salon routes
	authGroup.GET("/salons", controller.GetSalons)
	authGroup.POST("/salons", controller.CreateSalon)
	authGroup.GET("/salons/:salonId", controller.GetSalon)
	authGroup.PUT("/salons/:salonId", controller.UpdateSalon)
	authGroup.DELETE("/salons/:salonId", controller.DeleteSalon)
}
