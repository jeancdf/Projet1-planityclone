package main

import (
	"backend/backend/database"
	"fmt"
	"strconv"
	"strings"
)

type Service struct {
	ID    uint    `gorm:"primary_key;auto_increment"`
	Name  string  `gorm:"size:255;not null;unique"`
	Price float64 `gorm:"not null"`
}

var defaultServices = []struct {
	Name  string
	Price string
}{
	{"Coupe de cheveux pour femmes", "50€"},
	{"Coupe de cheveux pour hommes", "30€"},
	{"Coupe pour enfants", "20€"},
	{"Coloration des cheveux", "70€"},
	{"Balayage", "90€"},
	{"Mèches", "80€"},
	{"Ombré / Sombre", "100€"},
	{"Permanente", "60€"},
	{"Lissage brésilien", "150€"},
	{"Défrisage", "50€"},
	{"Soins capillaires profonds", "40€"},
	{"Masque capillaire", "30€"},
	{"Coiffure de mariage", "120€"},
	{"Coiffures événementielles", "60€"},
	{"Extensions de cheveux", "200€"},
	{"Traitement anti-chute de cheveux", "45€"},
	{"Brushing", "25€"},
	{"Coupe de la barbe pour hommes", "25€"},
	{"Rasage traditionnel", "20€"},
	{"Manucure", "30€"},
	{"Pédicure", "40€"},
	{"Épilation à la cire visage", "15€"},
	{"Épilation à la cire corps", "50€"},
	{"Maquillage professionnel", "50€"},
	{"Conseil en image et relooking", "100€"},
}

func main() {
	db := database.Db
	var count int64
	db.Model(&Service{}).Count(&count)
	if count == 0 {
		for _, ds := range defaultServices {
			price, err := strconv.ParseFloat(strings.TrimSuffix(ds.Price, "€"), 64)
			if err != nil {
				fmt.Printf("Error parsing price for service %s: %v\n", ds.Name, err)
				continue
			}
			service := Service{Name: ds.Name, Price: price}
			result := db.Create(&service)
			if result.Error != nil {
				fmt.Printf("Error inserting service %s: %v\n", ds.Name, result.Error)
			}
		}
	}
}
