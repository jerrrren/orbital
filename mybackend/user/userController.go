package user

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	//"github.com/go-playground/validator/v10"
	"github.com/bojie/orbital/backend/auth"
	"github.com/bojie/orbital/backend/db"
)

func GetUserNames() gin.HandlerFunc {
	return func(c *gin.Context) {
		type UserName struct {
			ID   uint   `json:"uid"`
			Name string `json:"username"`
		}
		var userNames []UserName

		rows, err := db.DB.Query("SELECT uid, name FROM users ")
		if err != nil {
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": "error"})
			return
		}

		for rows.Next() {
			var userName UserName
			if err := rows.Scan(&userName.ID, &userName.Name); err != nil {
				c.IndentedJSON(http.StatusNotFound, gin.H{"message": "error"})
				return
			}

			userNames = append(userNames, userName)
		}
		c.IndentedJSON(http.StatusOK, userNames)
		defer rows.Close()
	}
}

func GetUserNamesId() gin.HandlerFunc {
	return func(c *gin.Context) {
		var uid int
		var name string

		id := c.Param("id")
		row := db.DB.QueryRow("SELECT uid, name FROM users WHERE uid=$1", id)
		err := row.Scan(&uid, &name)
		if err != nil {
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": "No such user exist"})
			return
		}
		c.IndentedJSON(http.StatusOK, gin.H{
			"uid" : uid,
			"username" : name,
		})
	}
}

 
func GetUsers() gin.HandlerFunc {
	return func(c *gin.Context) {
		if err := auth.CheckUserType(c, "ADMIN"); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var users []auth.User

		rows, err := db.DB.Query("SELECT * FROM users")
		if err != nil {
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": "error"})
			return
		}

		for rows.Next() {
			var user auth.User
			if err := rows.Scan(&user.ID, &user.Name, &user.Password, &user.Token, &user.Refresh_token, &user.User_type); err != nil {
				c.IndentedJSON(http.StatusNotFound, gin.H{"message": "error"})
				return
			}

			users = append(users, user)
		}

		c.IndentedJSON(http.StatusOK, users)
		defer rows.Close()

	}
}

//this function might not be used
func GetUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		uid := c.Param("user_id")
		var user auth.User

		row := db.DB.QueryRow("SELECT * FROM users WHERE uid = $1", uid)

		if err := row.Scan(&user.ID, &user.Name, &user.Password, &user.Token, &user.Refresh_token, &user.User_type); err != nil {
			if err == sql.ErrNoRows {
				c.IndentedJSON(http.StatusNotFound, gin.H{"message": "no row"})
				return
			}

			c.IndentedJSON(http.StatusNotFound, gin.H{"message": err.Error()})
			return
		}
		user.Password = ""
		c.IndentedJSON(http.StatusOK, user)
	}
}
