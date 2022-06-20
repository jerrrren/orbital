package main

import (
	"finalbackend/database"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func getPosts(c *gin.Context) {
	posts, err := database.GetPosts()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, posts)
}

func getPostsById(c *gin.Context) {
	id := c.Param("id")
	intId, err := strconv.Atoi(id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "error in converting id to int"})
	}
	post, err := database.GetPostById(intId)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, post)
}