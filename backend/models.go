
package main

import (
	"github.com/gorilla/websocket"
)

type User struct {
	ID            uint   `json:"uid"`
	Name          string `json:"username"`
	Password      string `json:"password"`
	User_type     string `json:"user_type" validate:"required, eq=ADMIN|eq=USER"`
	Refresh_token string `json:"refresh_token"`
	Token         string `json:"token"`
}

type Authentication struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Token struct {
	Role        string `json:"role"`
	Email       string `json:"email"`
	TokenString string `json:"token"`
}


type Client struct {
	conn     *websocket.Conn
	wsServer *WsServer
	send     chan []byte
	rooms    map[*Room]bool
	ID     int `json:"id"`
}

type WsServer struct {
	clients    map[*Client]bool
	register   chan *Client
	unregister chan *Client
	broadcast  chan []byte
	rooms      map[*Room]bool
}

type Room struct {
	name       string
	clients    map[*Client]bool
	register   chan *Client
	unregister chan *Client
	broadcast  chan *Message
}

type Message struct {
	Action  string  `json:"action"`
	Message string  `json:"message"`
	Target  string  `json:"target"`
	SenderId string `json:"senderId"`
	TimeStamp string `json:"timeStamp"`
//	Sender  *Client 
}
