import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { Formik, Form, Field } from "formik";

import LoggedinNavbar from "../navigation/nav";
import { Button, Flex, Heading, Box, Textarea } from "@chakra-ui/react";

import useAuth from "../../../hooks/useAuth";
import { url } from "../../../constants/url";

import ChatMessages from "./chatMessages";

const ChatPage = () => {
  const [receiver, setreceiver] = useState(null);

  const { userId } = useParams();

  const id = useAuth((state) => state.uid);

  const URL = url.get_username + id;
  const wsURL = url.get_ws + id;
  const messagesURL = url.get_messages + id;
  const [webServer, setWs] = useState();
  const [messages, setmessages] = useState([]);
  const [users, setusers] = useState([]);
  const initialValues = { body: "" };

  const submitForm = (values, { resetForm }) => {
    if (receiver) {
      const timestamp = new Intl.DateTimeFormat([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(Date.now());

      const message = {
        action: "send-private-message",
        target: receiver.uid.toString(),
        message: values.body,
        senderId: id,
        timeStamp: timestamp,
      };

      setmessages((messages) => [message, ...messages]);

      webServer.send(JSON.stringify(message));
      resetForm({ value: "" });

      /*axios
        .post("http://localhost:8080/posts", {
          body: values.body,
        })
        .then(console.log({ receiver: receiver, body: values.body }))
        .catch((err) => console.log(err));*/
    }
  };

  useEffect(() => {
    const ws = new WebSocket(wsURL);
    ws.onopen = () => {
      console.log("WebSocket Connected");
      setWs(ws);
    };

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log("receivedmessage");
      console.log(messages);
      setmessages((messages) => [message, ...messages]);
    };

    axios
      .get(messagesURL)
      .then((res) => {
        if (res.data) {
          {
            console.log(res.data);
            setmessages([...messages, ...res.data]);
          }
        }

        console.log(res);
      })
      .catch((err) => console.log(err));

    axios
      .get(URL)
      .then((res) => {
        setusers(res.data);
        if (userId && userId!=id) {
          console.log(res.data)
          for (const variable of res.data) {
            if (userId == variable.uid) {
              setreceiver(variable);
              console.log(receiver)
            }
          }
        }
      })

      .catch((err) => console.log(err));

    return () => {
      ws.close();
    };
  }, []); //[ws.onmessage, ws.onopen]);

  const tabs = users
    ?.filter((name) => name.uid != id)
    .map((user) => (
      <Button
        width="14.1vw"
        height="10vh"
        minHeight="10vh"
        key={user}
        onClick={() => {
          setreceiver(user);
        }}
        variant={receiver && user.uid == receiver.uid ? "toggled" : "outline"}
      >
        {user.username}
      </Button>
    ));

  return (
    <Flex
      direction="column"
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <LoggedinNavbar />
      <Flex style={{ flexGrow: 4, position: "relative", maxHeight: "100%" }}>
        <Flex
          direction="column"
          style={{
            overflowY: "scroll",
            position: "relative",
            height: "94vh",
            width: "15vw",
          }}
        >
          {tabs}
        </Flex>
        <Box
          style={{
            width: "85vw",
            height: "91.5vh",
          }}
        >
          <Heading padding="3" style={{ fontWeight: "normal" }}>
            {receiver ? receiver.username : "Please select a user to chat with"}
          </Heading>


          {webServer &&
          <Flex
            padding="3"
            style={{
              flexDirection: "column",
              background: "#ffb44c",
              flexGrow: 3,
              position: "relative",
              height: "87vh",
              width: "85vw",
              alignItems: "center",
              justifyContent: "flex-end",
              marginRight: "0.5vw",
            }}
          >
              {receiver && (
                <ChatMessages
                  messages={messages}
                  receiver={receiver}
                ></ChatMessages>
              )}
              <Box margin="1vw">
                <Formik onSubmit={submitForm} initialValues={initialValues}>
                  <Form>
                    <Field name="body">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }) => (
                        <Textarea
                          width="75vw"
                          requiredtype="text"
                          id="body"
                          name="body"
                          marginRight="1vw"
                          {...field}
                        ></Textarea>
                      )}
                    </Field>

                    <Button marginBottom="1vh" type="submit">
                      Send
                    </Button>
                  </Form>
                </Formik>
              </Box>
              
            
          </Flex>
           }
        </Box>
      </Flex>
    </Flex>
  );
};

export default ChatPage;
