package main

import (
	routes "backend/backend/routes"
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"backend/backend/database"
)

func main() {
	fmt.Println("Server is running on :8000")
	db := database.Db
	database.DbMigrate(db)
	router := gin.New()
	router.Use(gin.Logger())

	routes.AuthRouter(router)
	routes.UsersRouter(router)

	http.ListenAndServe(":8000", router)
}
