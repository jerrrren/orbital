package server

import (
	"errors"
	"go-todo-list/internal/database"
	"net/http"
	"strings"

	"github.com/rs/zerolog/log"

	"github.com/gin-gonic/gin"
)

func authorization(c *gin.Context) {
	//extract token from Authorization header
	authHeader := c.GetHeader("Authorization")

	//check if header exists
	if authHeader == "" {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing."})
		return
	}

	//check if header is in valid format
	headerParts := strings.Split(authHeader, " ")
	if len(headerParts) != 2 {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header format is not valid."})
		return
	}

	if headerParts[0] != "Bearer" {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is missing bearer part."})
		return
	}

	//verify, and return ID if verification passes
	//and if verification passes, fetch User with the ID from database and set
	//as current user for this context
	userID, err := verifyJwt(headerParts[1])
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}
	user, err := database.FetchUser(userID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}
	c.Set("user", user)
	c.Next()
}

func currentUser(ctx *gin.Context) (*database.User, error) {
	var err error

	//check if user is set for this context
	_user, exists := ctx.Get("user")
	if !exists {
		err = errors.New("Current context user not set")
		log.Error().Err(err).Msg("")
		return nil, err
	}

	//check is _user is of type *database.User
	user, ok := _user.(*database.User)
	if !ok {
		err = errors.New("Context user is not valid type")
		log.Error().Err(err).Msg("")
		return nil, err
	}

	//when both check passes, current user is returned from context
	return user, nil
}
