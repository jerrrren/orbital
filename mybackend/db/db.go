package db

import (
	"database/sql"
	"fmt"
//	"os"

	_ "github.com/lib/pq"
	

)


/*
online postgres server
const (
	host     = "ec2-54-211-255-161.compute-1.amazonaws.com"
	port     =  5432
	user     = "fdikfgagiyyaxq"
	password = "e6398263fc3d8545d90cb455bc46cbcf7c47fd74ef9e6a8633e15c48c90feeff"
	dbname   = "db2jrt4m1j59dh"
)
*/


//user => user
//databse => dbName
var (
	host     ="ec2-44-197-128-108.compute-1.amazonaws.com"
	port     = 5432
	user     = "mqjrvefghqxlhv"
	password = "cca888d9038cf321c84bf99818ebff43f59a94128d5c62234a0ede1b0804571c"
	dbname   = "d3ga04g34evs5b"
)


var DB *sql.DB = setupDatabase()


func setupDatabase() *sql.DB {
	fmt.Println("hello")
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=require",//need to change when uploading
		host, port , user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Successfully connected to database!")
	return db

}
