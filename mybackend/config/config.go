package config

import (
	"log"
	"os"
	"strconv"
)

const (
	dbHostKey     = "DB_HOST"
	dbPortKey     = "DB_PORT"
	dbNameKey     = "DB_NAME"
	dbUserKey     = "DB_USER"
	dbPasswordKey = "DB_PASSWORD"
	jwtSecretKey  = "JWT_TOKEN"
)

type Config struct {
	DbHost     string
	DbPort     int
	DbName     string
	DbUser     string
	DbPassword string
	JwtSecret  string
}

func NewConfig() Config {
	dbHost, ok := os.LookupEnv(dbHostKey)
	if !ok || dbHost == "" {
	  logAndPanic(dbHostKey)
	}
   
	val, ok := os.LookupEnv(dbPortKey)
	if !ok || val == "" {
	  logAndPanic(dbPortKey)
	}

	dbPort, err := strconv.Atoi(val)
	if err != nil {
		logAndPanic("error in converting port from string to int")
	}
   
	dbName, ok := os.LookupEnv(dbNameKey)
	if !ok || dbName == "" {
	  logAndPanic(dbNameKey)
	}
   
	dbUser, ok := os.LookupEnv(dbUserKey)
	if !ok || dbUser == "" {
	  logAndPanic(dbUserKey)
	}
   
	dbPassword, ok := os.LookupEnv(dbPasswordKey)
	if !ok || dbPassword == "" {
	  logAndPanic(dbPasswordKey)
	}
   
	jwtSecret, ok := os.LookupEnv(jwtSecretKey)
	if !ok || jwtSecret == "" {
		logAndPanic(jwtSecret)
	}
	return Config{
	  DbHost:     dbHost,
	  DbPort:     dbPort,
	  DbName:     dbName,
	  DbUser:     dbUser,
	  DbPassword: dbPassword,
	  JwtSecret:  jwtSecret,
	}
  }
   
  func logAndPanic(envVar string) {
	log.Println("ENV variable not set or value not valid: ", envVar)
	panic(envVar)
  }