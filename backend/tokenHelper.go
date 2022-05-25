package main

import (
	"fmt"
	"time"
	"os"
	

	jwt "github.com/dgrijalva/jwt-go"
	
)

type SignedDetails struct {
	Name     string `json:"name"`
	User_type string `json:"user_type" validate:"required, eq=ADMIN|eq=USER"`
	jwt.StandardClaims	
}

var SECRET_KEY string = os.Getenv("SECRET_KEY")

func GenerateAllTokens(name string,user_type string)(signedToken string,signedRefreshToken string,err error){
	claims := &SignedDetails{
		Name : name,
		User_type : user_type,
		StandardClaims:jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(24)).Unix(),
		},

	}
	refreshClaims := &SignedDetails{
		StandardClaims:jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(168)).Unix(),
		},

	}
	token,err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(SECRET_KEY))
	refreshToken, err := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims).SignedString([]byte(SECRET_KEY))

	if err != nil {
		panic(err)
		return 
	}

	return token, refreshToken, err

}