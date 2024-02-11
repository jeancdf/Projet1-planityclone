package main

import (
	routes "backend/backend/routes"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.New()
	router.Use(gin.Logger())

	routes.AuthRouter(router)
	routes.UsersRouter(router)
	routes.SalonRouter(router)
	routes.ReservationRouter(router)

	fmt.Println("Server is running on :8000")
	http.ListenAndServe(":8000", router)
}
