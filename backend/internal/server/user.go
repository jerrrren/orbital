package server

import (
	"go-todo-list/internal/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func signUp(c *gin.Context) {
	user := new(database.User)
	if err := c.Bind(user); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := database.AddUser(user); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "sign up successful",
	})
}

func signIn(c *gin.Context) {
	user := new(database.User)
	if err := c.Bind(user); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user, err := database.Authenticate(user.Username, user.Password)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.SetCookie("auth_cookie", generateJWT(user), 60*60*24, "/", "localhost", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "sign-in successful!",
		"userID":user.ID,
	})
}
