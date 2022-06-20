package main

import (
	"finalbackend/server"
	"finalbackend/config"
)

func main() {
  server.Start(config.NewConfig())
}