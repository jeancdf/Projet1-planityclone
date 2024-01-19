package main

import (
	"backend/backend/database"
)

func main() {
	db := database.Db
	database.DbMigrate(db)
}
