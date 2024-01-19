package database

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"backend/backend/models"
	"os"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB
var err error

func Dbinstance() *gorm.DB {
	if db == nil {
		os.Setenv("DB_USER", "myuser")
		os.Setenv("DB_PASS", "mypassword")
		os.Setenv("DB_NAME", "mydb")
		os.Setenv("DB_HOST", "localhost") 
		os.Setenv("DB_PORT", "3331")    
		dbUser := os.Getenv("DB_USER")
		dbPass := os.Getenv("DB_PASS")
		dbName := os.Getenv("DB_NAME")
		dbHost := os.Getenv("DB_HOST")
		dbPort := os.Getenv("DB_PORT")

		dbURI := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s", dbHost, dbPort, dbUser, dbName, dbPass)

		db, err = gorm.Open("postgres", dbURI)
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
	db.AutoMigrate(&userModels.User{})
}

func CloseDb(db *gorm.DB) {
	defer db.Close()
}
