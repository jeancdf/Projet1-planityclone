package database

import (
	userModels "backend/backend/models"
	"fmt"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/joho/godotenv"
)

var db *gorm.DB
var err error

func Dbinstance() *gorm.DB {
	if db == nil {
		err := godotenv.Load()
		if err != nil {
			fmt.Println("Error loading .env file")
			panic(err)
		}

		connectionString := os.Getenv("DB_CONNECTION_STRING")
		db, err = gorm.Open("postgres", connectionString)
		if err != nil {
			fmt.Printf("Cannot connect to %s database\n", "postgres")
			panic(err)
		} else {
			fmt.Printf("Connected to %s database\n", "postgres")
		}
	}

	return db
}

var Db = Dbinstance()

func DbMigrate(db *gorm.DB) {
	db.AutoMigrate(&userModels.User{}, &userModels.Salon{}, &userModels.Reservation{}, &userModels.Service{})
}

func CloseDb(db *gorm.DB) {
	defer db.Close()
}
