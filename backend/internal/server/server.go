package server

import (
	"go-todo-list/internal/config"
	"go-todo-list/internal/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Start(cfg config.Config) {
	//set up the jwt signer and jwt verifier
	jwtSetup(cfg)

	//set up connection with database
	database.SetDBConn(cfg)

	// Creates default gin router with Logger and Recovery middleware already attached
	router := gin.Default()

	// Enables automatic redirection if the current route can't be matched but a
	// handler for the path with (without) the trailing slash exists.
	router.RedirectTrailingSlash = true

	// Create API route group
	api := router.Group("/api")
	{
		api.POST("/signup", signUp)
		api.POST("/signin", signIn)
		api.GET("/user", getUser)
		api.POST("/logout", logOut)
	}

	// authorized := api.Group("/")
	// authorized.Use(authorization)
	// {
	// 	authorized.GET("/posts", indexPosts)
	// 	authorized.POST("/posts", createPost)
	// 	authorized.PUT("/posts", updatePost)
	// 	authorized.DELETE("/posts/:id", deletePost)
	// }

	router.NoRoute(func(ctx *gin.Context) { ctx.JSON(http.StatusNotFound, gin.H{}) })
	// Start listening and serving requests
	router.Run(":8080")
}
