package main

import (
	"encoding/json"
	"fmt"
)

const SendMessageAction = "send-message"
const JoinRoomAction = "join-room"
const LeaveRoomAction = "leave-room"
const SendPrivateMessage = "send-private-message"

func (message *Message) encode() []byte {
	json, err := json.Marshal(message)
	if err != nil {
		fmt.Println(err)
	}

	return json
}

