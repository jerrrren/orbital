package user

import (
	"github.com/gin-gonic/gin"
	"github.com/bojie/orbital/backend/routerMiddleware"
	"github.com/bojie/orbital/backend/posts"
	"github.com/bojie/orbital/backend/chat"
)

func UserRoutes(incomingRoutes *gin.Engine){
	incomingRoutes.GET("/users",routerMiddleware.Authenticate(),GetUsers())
	incomingRoutes.GET("/user_names/:user_id",GetUserNames())
	incomingRoutes.GET("/messages/:user_id",chat.GetMessages())
	incomingRoutes.GET("/posts/getPosts", posts.GetPosts)
	incomingRoutes.GET("/posts/getPosts/:id", posts.GetPostsById)
	incomingRoutes.GET("/users/getUser/:id", GetUserNamesId())
	//incomingRoutes.GET("/users/:user_id",routerMiddleware.Authenticate(),GetUser())
}			