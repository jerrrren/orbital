package main

import (
	"bytes"
	"encoding/json"
	"math/rand"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"
	"time"

	"github.com/bojie/orbital/backend/auth"
	"github.com/bojie/orbital/backend/db"
	_ "github.com/bojie/orbital/backend/pairing"

	"github.com/gin-gonic/gin"
)

//test user name
var user1 string
var user2 string
var user3 string

//function to create name that is not in users table
func getName() string {
	rand.Seed(time.Now().UnixNano())
	name := strconv.Itoa(rand.Int())
	for !check(name) {
		name = strconv.Itoa(rand.Int())
	}
	return name
}

func check(name string) bool {
	var value bool
	row := db.DB.QueryRow("select exists(select 1 from users where name=$1)", name)
	if err := row.Scan(&value); err != nil {
		panic(err.Error())
	}
	return !value
}

// function to setup the name
func setUp() {
	user1 = getName()
	user2 = getName()
	for user2 == user1 {
		user2 = getName()
	}
	user3 = getName()
	for user3 == user2 || user3 == user1 {
		user3 = getName()
	}
}

//function to delete the name
func tearDown() {
	_, err := db.DB.Exec("DELETE FROM users WHERE name in ($1, $2, $3)", user1, user2, user3)
	if err != nil {
		panic(err.Error())
	}
}

func TestFunction(t *testing.T) {
	setUp()
	testRegister(t)
	tearDown()
}

//skeleton of test code
// 1) create router and assign handler function
// 2) create req
// 3) create http response recorder
// 4) send req created in step 2
// 5) check if result is same as expected

func testRegister(t *testing.T) {
	t.Log("Starting test on register")
	router := gin.Default()
	router.POST("/users/register", auth.Signup())
	value := map[string]string{"Username": user1, "Password": "password1", "User_type" : "user"}
	jsonData, err := json.Marshal(value)
	if err != nil {
		t.Log("Unable to marshal into json" + err.Error())
	}

	t.Log("Testing if able to add new user")
	req, err := http.NewRequest("POST", "/users/register", bytes.NewBuffer(jsonData))
	if err != nil {
		t.Error(err.Error())
	}
	response := httptest.NewRecorder()
	router.ServeHTTP(response, req)
	if (response.Code != 200) {
		t.Error("Error in registering new user")
	}
	t.Log("Testing to check that duplicate user name cannot be registered")
	secReq, err := http.NewRequest("POST", "/users/register", bytes.NewBuffer(jsonData))
	secResponse := httptest.NewRecorder()
	router.ServeHTTP(secResponse, secReq)
	if (secResponse.Code != 400) {
		t.Error("Error, duplicate username should not be able to be added")
	}
}

//yet to finish the code for login
// func testLogin(t *testing.T) {
// 	t.Log("Starting test for login")
// 	//register user first
// 	router := gin.Default()
// 	router.POST("/users/register", auth.Signup())
// 	value := map[string]string{"Username": user1, "Password": "password1", "User_type" : "user"}
// 	jsonData, err := json.Marshal(value)
// 	if err != nil {
// 		t.Log("Unable to marshal into json" + err.Error())
// 	}

// 	t.Log("Registering user for login test")
// 	req, err := http.NewRequest("POST", "/users/register", bytes.NewBuffer(jsonData))
// 	if err != nil {
// 		t.Error(err.Error())
// 	}
// 	response := httptest.NewRecorder()
// 	router.ServeHTTP(response, req)
// 	if (response.Code != 200) {
// 		t.Error("Error in registering user")
// 	}
// 	router.POST("/users/login", auth.Login())
// 	loginVal1 := map[string]string{"Username": user1, "Password": "password1"}
// 	loginVal2 := map[string]string{"Username": user1, "Password": "password2"}
// 	loginJson1, err := json.Marshal(loginVal1)
// 	if err != nil {
// 		t.Error("unable to marshal into json" + err.Error())
// 	}
// 	loginJson2, err := json.Marshal(loginVal2)
// 	if err != nil {
// 		t.Error("unable to unmarshal into json" + err.Error())
// 	}
// 	loginReq1, err := http.NewRequest("POST", "users/login", bytes.NewBuffer(loginJson1))
// 	loginReq2, err := http.NewRequest("POST", "users/login", bytes.NewBuffer(loginJson2))
// 	resp1 := httptest.NewRecorder()
// 	resp2 := httptest.NewRecorder()
// 	router.ServeHTTP(resp1, loginReq1)
// 	router.ServeHTTP(resp2, loginReq2)
// 	t.Log(resp1)
// 	t.Log(resp2)
// }