package database

import (
	"database/sql"
	"finalbackend/config"
	"fmt"

	_ "github.com/lib/pq"
)

const (
	host     = "ec2-34-225-159-178.compute-1.amazonaws.com"
	port     = 5432
	user     = "iixjrncalwyxzx"
	password = "eb2744b258e5fbabc7c439ae347759b9216b50ffd9929e79795b2656a4cb822d"
	dbname   = "d84kb1da7rr16s"
)

var db *sql.DB

func SetDBConn(c config.Config) {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=require",
		c.DbHost, c.DbPort, c.DbUser, c.DbPassword, c.DbName)

	var err error
	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}
}
