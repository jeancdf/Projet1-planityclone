package userModels

import (
	"time"
)


type RoleType string

const (
    AdminRole    RoleType = "admin"
    CustomerRole RoleType = "customer"
    ClientRole   RoleType = "client"
)

type User struct {
	ID        uint        `gorm:"primary_key;auto_increment" json:"id"`
	Username  string      `gorm:"size:255;not null;unique" json:"username"`
	Email     string      `gorm:"size:100;not null;unique" json:"email"`
	Password  string      `gorm:"size:100;not null;" json:"password"`
	Roles     string     `gorm:"type:varchar(255);not null" json:"roles"`
	CreatedAt time.Time   `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
}