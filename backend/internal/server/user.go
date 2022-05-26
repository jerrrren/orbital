package server

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"go-todo-list/internal/database"
	"net/http"
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
		"message": "sign-up successful!",
		"jwt":     generateJWT(user),
	})
}

func signIn(c *gin.Context) {
	user := new(database.User)
	if err := c.Bind(user); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user, err := database.Authenticate(user.Username, user.Password)
	fmt.Println(user.HashedPassword)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "sign in failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"msg": "Signed in successfully.",
		"jwt": generateJWT(user),
	})
}
