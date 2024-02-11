package userModels

import (
	"time"
)

type RoleType string

const (
	AdminRole  RoleType = "admin"
	SalonRole  RoleType = "salon"
	ClientRole RoleType = "client"
)

type User struct {
	ID        uint      `gorm:"primary_key;auto_increment" json:"id"`
	Username  string    `gorm:"size:255;not null;unique" json:"username"`
	Email     string    `gorm:"size:100;not null;unique" json:"email"`
	Password  string    `gorm:"size:100;not null;" json:"password"`
	Roles     string    `gorm:"type:varchar(255);not null" json:"roles"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
}

type Salon struct {
	ID        uint      `gorm:"primary_key;auto_increment" json:"id"`
	Name      string    `gorm:"size:255;not null;unique" json:"name"`
	Email     string    `gorm:"size:100;not null;unique" json:"email"`
	UserID    uint      `gorm:"not null" json:"user_id"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
	Address   string    `gorm:"size:255;not null;" json:"address"`
	Phone     string    `gorm:"size:255;not null;" json:"phone"`
	service   []Service `gorm:"foreignKey:SalonID" json:"service"`
}

type Reservation struct {
	ID              uint      `gorm:"primary_key;auto_increment" json:"id"`
	ReservationDate time.Time `gorm:"not null;" json:"reservation_date"`
	UserID          uint      `gorm:"not null" json:"user_id"`
	SalonID         uint      `gorm:"not null" json:"salon_id"`
	Status          *bool     `gorm:"" json:"status"`
	CreatedAt       time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt       time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

type Service struct {
	ID    uint    `gorm:"primary_key;auto_increment" json:"id"`
	Name  string  `gorm:"size:255;not null;unique" json:"name"`
	Price float64 `gorm:"not null" json:"price"`
}
