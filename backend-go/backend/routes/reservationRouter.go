package routes

import (
	controller "backend/backend/controllers"
	authMiddleware "backend/backend/middleware"

	"github.com/gin-gonic/gin"
)

func ReservationRouter(r *gin.Engine) {
	authGroup := r.Group("/api")
	authGroup.Use(authMiddleware.AuthMiddleware())

	// Reservation routes
	authGroup.GET("/reservations", controller.GetReservations)
	authGroup.POST("/reservations", controller.CreateReservation)
	authGroup.GET("/reservations/:reservationId", controller.GetReservation)
	authGroup.PUT("/reservations/:reservationId", controller.UpdateReservation)
	authGroup.DELETE("/reservations/:reservationId", controller.DeleteReservation)

	// Specific routes for accepting and declining reservations
	authGroup.PUT("/salons/:salonId/reservations/:reservationId/accept", controller.AcceptReservation)
	authGroup.PUT("/salons/:salonId/reservations/:reservationId/decline", controller.DeclineReservation)
}
