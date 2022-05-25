package main

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

var validate = validator.New()

func Signup() gin.HandlerFunc {
	return func(c *gin.Context) {
		var user User

		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		validationErr := validate.Struct(user) //check detail of user struct variable
		if validationErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
			return
		}
		//check duplicate rows not included
		token, refreshToken, _ := GenerateAllTokens(user.Name, user.User_type)
		user.Token = token
		user.Refresh_token = refreshToken

		result, err := db.Exec("INSERT INTO users (name,password,refresh_token,token) VALUES ($1, $2, $3,$4)", user.Name, user.Password, user.Refresh_token, user.Token)

		if err != nil {
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
			return
		}

		c.JSON(http.StatusOK, result)
	}
}

func Login() gin.HandlerFunc {
	return func(c *gin.Context) {
		var user User
		var foundUser User
		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		row := db.QueryRow("SELECT * FROM users WHERE (Name = $1 AND Password = $2)", user.Name, user.Password)

		if err := row.Scan(&foundUser.ID, &foundUser.Name, &foundUser.Password, &foundUser.User_type, &foundUser.Refresh_token); err != nil {
			if err == sql.ErrNoRows {
				c.IndentedJSON(http.StatusNotFound, gin.H{"message": "password or username incorrect"})
				return
			}

			c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
			return
		}

		token, refreshToken, _ := GenerateAllTokens(foundUser.Name, foundUser.User_type)
		UpdateAllTokens(token, refreshToken, foundUser.ID)

		newrow := db.QueryRow("SELECT * FROM users WHERE (Name = $1 AND Password = $2)", user.Name, user.Password)

		if err := newrow.Scan(&foundUser.ID, &foundUser.Name, &foundUser.Password, &foundUser.User_type, &foundUser.Refresh_token); err != nil {
			if err == sql.ErrNoRows {
				c.IndentedJSON(http.StatusNotFound, gin.H{"message": "password or username incorrect"})
				return
			}

			c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
			return
		}
		c.JSON(http.StatusOK,foundUser)

	}

}

func GetUsers() {

}

func GetUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		uid := c.Param("uid")
		var user User

		row := db.QueryRow("SELECT * FROM users WHERE uid = $1", uid)

		if err := row.Scan(&user.ID, &user.Name, &user.Password, &user.User_type, &user.Refresh_token); err != nil {
			if err == sql.ErrNoRows {
				c.IndentedJSON(http.StatusNotFound, gin.H{"message": "no row"})
				return
			}

			c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
			return
		}
		c.IndentedJSON(http.StatusOK, user)
	}
}
