package authMiddleware

import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"time"
	"github.com/dgrijalva/jwt-go"
)

var jwtKey = []byte("so_secret_key")


type Claims struct {
	UserID uint
	jwt.StandardClaims
}

func GenerateToken(userID uint) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
    claims := &Claims{
        UserID: userID,
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: expirationTime.Unix(),
        },
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := token.SignedString(jwtKey)

    return tokenString, err
}

func TokenValid(r *http.Request) error {
	tokenString := ExtractToken(r)
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
				return jwtKey, nil
		})
	if err != nil {
		return err
	}
	if _, ok := token.Claims.(*Claims); !ok && !token.Valid {
				return err
		}
	return nil
}

func ExtractToken(r *http.Request) string {
	keys := r.URL.Query()
	token := keys.Get("token")
	if token != "" {
				return token
		}

	bearerToken := r.Header.Get("Authorization")
	if len(bearerToken) > 7 {
				return bearerToken[7:]
		}
	return ""
}


func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		err := TokenValid(c.Request)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		fmt.Println("User is authenticated")
		c.Next()
	}
}
