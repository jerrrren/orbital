package main

import (
	"go-todo-list/internal/server"
	"go-todo-list/internal/config"
)

func main() {
  server.Start(config.NewConfig())
}