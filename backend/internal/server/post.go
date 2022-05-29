package server

// import (
// 	"go-todo-list/internal/database"
// 	"net/http"
// 	"strconv"
// 	"time"

// 	"github.com/gin-gonic/gin"
// )

// func createPost(c *gin.Context) {
// 	post := new(database.Post)
// 	//Bind post
// 	if err := c.Bind(post); err != nil {
// 		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	//get current user
// 	user, err := currentUser(c)
// 	if err != nil {
// 		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	//add post to database
// 	if err := database.AddPost(user, post); err != nil {
// 		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{
// 		"msg":  "post created successfully",
// 		"data": post,
// 	})
// }

// func indexPosts(c *gin.Context) {
// 	user, err := currentUser(c)
// 	if err != nil {
// 		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}
// 	if err := database.FetchUserPosts(user); err != nil {
// 		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{
// 		"msg":  "Posts fetched successfully.",
// 		"data": user.Posts,
// 	})
// }

// func updatePost(c *gin.Context) {
// 	jsonPost := new(database.Post)
// 	if err := c.Bind(jsonPost); err != nil {
// 		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	user, err := currentUser(c)
// 	if err != nil {
// 		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}
// 	dbPost, err := database.FetchPost(jsonPost.ID)
// 	if err != nil {
// 		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}
// 	if user.ID != dbPost.UserID {
// 		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "Not authorized."})
// 		return
// 	}
// 	jsonPost.ModifiedAt = time.Now()
// 	if err := database.UpdatePost(jsonPost); err != nil {
// 		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{
// 		"msg":  "Post updated successfully.",
// 		"data": jsonPost,
// 	})
// }

// func deletePost(c *gin.Context) {
// 	paramID := c.Param("id")
// 	id, err := strconv.Atoi(paramID)
// 	if err != nil {
// 		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	user, err := currentUser(c)
// 	if err != nil {
// 		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	post, err := database.FetchPost(id)
// 	if err != nil {
// 		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	if user.ID != post.UserID {
// 		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "not authorized"})
// 		return
// 	}
// 	if err := database.DeletePost(post); err != nil {
// 		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"msg": "post is deleted successfully"})
// }
