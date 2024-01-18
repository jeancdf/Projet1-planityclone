package database

import (
	"fmt"
	"os"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func Dbinstance() *gorm.DB {
	os.Setenv("DB_USER", "myuser")
	os.Setenv("DB_PASS", "mypassword")
	os.Setenv("DB_NAME", "mydb")
	os.Setenv("DB_HOST", "localhost") 
	os.Setenv("DB_PORT", "5432")    
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbName := os.Getenv("DB_NAME")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")

	dbURI := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s", dbHost, dbPort, dbUser, dbName, dbPass)

	conn, err := gorm.Open("postgres", dbURI)
	if err != nil {
		panic(err)
	}

	return conn
}
