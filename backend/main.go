package main

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

var db *sql.DB

func main() {
	db = setupDatabase()

	wsServer := NewWebSocketServer()
	go wsServer.Run()

	router := gin.Default()

	router.Use(CORSMiddleware())
	AuthRoutes(router)
	UserRoutes(router)

	router.GET("/ws", ServeWs(wsServer))


	defer db.Close()
	router.Run()
}
