package main

import (
	"bytes"
	"encoding/json"
	_"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/bojie/orbital/backend/auth"
	"github.com/bojie/orbital/backend/chat"
	"github.com/bojie/orbital/backend/db"
	_ "github.com/bojie/orbital/backend/email"
	"github.com/bojie/orbital/backend/pairing"
	"github.com/bojie/orbital/backend/routerMiddleware"
	"github.com/bojie/orbital/backend/user"

	"github.com/gin-gonic/gin"
)

func checkResponseCode(t *testing.T, expected, actual int) {
	if expected != actual {
		t.Errorf("Expected response code %d. Got %d\n", expected, actual)
	}
}

func TestRegister(t *testing.T) {
	wsServer := chat.NewWebSocketServer()
	go wsServer.Run()

	router := gin.Default()

	router.Use(routerMiddleware.CORSMiddleware())
	auth.AuthRoutes(router)
	user.UserRoutes(router)

	router.GET("/ws", chat.ServeWs(wsServer))
	router.Run(":8080")

	var jsonStr = []byte(`{"Username": "a",
    "Password": "password1",
	"User_type" : "user",
	"Email" : "random@gmail.com"
	}`)

	req, err := http.NewRequest(http.MethodPost, "/users/signup", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatalf("Couldn't create request: %v\n", err)
	}
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)
	checkResponseCode(t, http.StatusOK, w.Code)
	db.DB.Exec("delete from users where name='a'")
}

func TestDuplicateRegister(t * testing.T) {
	db.DB.Exec("insert into users(name, password, refresh_token, token, user_type, verified, email) values('a', $1, 'random', 'random', 'user', true, 'random@gmail.com')", auth.HashPassword("password1"))
	wsServer := chat.NewWebSocketServer()
	go wsServer.Run()

	router := gin.Default()

	router.Use(routerMiddleware.CORSMiddleware())
	auth.AuthRoutes(router)
	user.UserRoutes(router)

	router.GET("/ws", chat.ServeWs(wsServer))
	router.Run(":8080")

	var jsonStr = []byte(`{"Username": "a",
    "Password": "password1",
	"User_type" : "user",
	"Email" : "random@gmail.com"
	}`)

	req, err := http.NewRequest(http.MethodPost, "/users/signup", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatalf("Couldn't create request: %v\n", err)
	}
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)
	if w.Code != http.StatusBadRequest {
		t.Error("Wrong code for duplicate register")
	}
	type Response struct {
		Message string `json:"message"`
	}
	var result Response
	err = json.Unmarshal(w.Body.Bytes(), &result)
	if err != nil {
		t.Fatal("Error in unmarshalling response body duplicate register")
	}
	if result.Message != "This username is already in use, please choose another one" {
		t.Error("Incorrect response body for register duplicate")
	}
	db.DB.Exec("delete from users where name='a'")
}

func TestLogin(t *testing.T) {
	db.DB.Exec("insert into users(name, password, refresh_token, token, user_type, verified, email) values('a', $1, 'random', 'random', 'user', true, 'random@gmail.com')", auth.HashPassword("password1"))
	wsServer := chat.NewWebSocketServer()
	go wsServer.Run()

	router := gin.Default()

	router.Use(routerMiddleware.CORSMiddleware())
	auth.AuthRoutes(router)
	user.UserRoutes(router)

	router.GET("/ws", chat.ServeWs(wsServer))
	router.Run(":8080")

	var jsonStr = []byte(`{"username": "a",
    "password": "password1"
	}`)

	req, err := http.NewRequest(http.MethodPost, "/users/login", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatalf("Couldn't create request: %v\n", err)
	}
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	checkResponseCode(t, http.StatusOK, w.Code)
	db.DB.Exec("delete from users where name='a'")
}

func TestLoginWrongPassword(t *testing.T) {
	db.DB.Exec("insert into users(name, password, refresh_token, token, user_type, verified, email) values('a', $1, 'random', 'random', 'user', true, 'random@gmail.com')", auth.HashPassword("password1"))
	wsServer := chat.NewWebSocketServer()
	go wsServer.Run()

	router := gin.Default()

	router.Use(routerMiddleware.CORSMiddleware())
	auth.AuthRoutes(router)
	user.UserRoutes(router)

	router.GET("/ws", chat.ServeWs(wsServer))
	router.Run(":8080")

	var jsonStr = []byte(`{"username": "a",
    "password": "wrongpass"
	}`)

	req, err := http.NewRequest(http.MethodPost, "/users/login", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatalf("Couldn't create request: %v\n", err)
	}
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusBadRequest {
		t.Error("Wrong code for incorrect login")
	}
	type Response struct {
		Message string `json:"message"`
	}
	var result Response	
	err = json.Unmarshal(w.Body.Bytes(), &result)
	if (err != nil) {
		t.Fatal("Could not unmarshall response body")
	}
	if (result.Message != "password or username incorrect") {
		t.Error("Wrong body response for incorrect login")
	}
	db.DB.Exec("delete from users where name='a'")
}

func TestPairing(t *testing.T) {
	db.DB.Exec("insert into singleusers(name, commitment, year, location, faculty) values('a', 2, 2, 'central', 'computing'), ('b', 2, 2, 'north', 'computing')")
	wsServer := chat.NewWebSocketServer()
	go wsServer.Run()

	router := gin.Default()

	router.Use(routerMiddleware.CORSMiddleware())
	auth.AuthRoutes(router)
	user.UserRoutes(router)
	pairing.PairingRoutes(router)

	router.GET("/ws", chat.ServeWs(wsServer))
	router.Run(":8080")

	var jsonStr = []byte(`{"Name": "c",
    "Commitment": 2,
	"Year": 2,
	"Location": "central",
	"Faculty": "computing",
	"SameFaculty": true
	}`)

	req, err := http.NewRequest(http.MethodPost, "/pairing/fillAndMatch", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatalf("Couldn't create request: %v\n", err)
	}
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	checkResponseCode(t, http.StatusOK, w.Code)
	db.DB.Exec("delete from singleusers where name in ('a', 'b', 'c')")
	db.DB.Exec("delete from pairedusers where name in ('a', 'b', 'c')")
}
