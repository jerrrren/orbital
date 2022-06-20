package server

import (
	"finalbackend/config"
	"finalbackend/database"
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

	router.Use(CORSMiddleware())

	// Enables automatic redirection if the current route can't be matched but a
	// handler for the path with (without) the trailing slash exists.
	router.RedirectTrailingSlash = true

	// Create API route group
	userApi := router.Group("/user")
	{
		userApi.POST("/signup", signUp)
		userApi.POST("/signin", signIn)
		userApi.GET("/getuser", getUser)
		userApi.POST("/logout", logOut)
	}

	postsApi := router.Group("/posts")
	{
		postsApi.GET("/getPosts", getPosts)
		postsApi.GET("/getPosts/:id", getPostsById)
	}
	router.NoRoute(func(ctx *gin.Context) { ctx.JSON(http.StatusNotFound, gin.H{}) })
	// Start listening and serving requests
	router.Run()
}
