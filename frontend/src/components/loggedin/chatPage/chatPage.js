import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";

import LoggedinNavbar from "../navigation/nav";
import { Button, Flex, Input, Box } from "@chakra-ui/react";
import useAuth from "../../../hooks/useAuth";

import ChatMessages from "./chatMessages";

const ChatPage = () => {
  const [receiver, setreceiver] = useState(null);
  const id = useAuth((state) => state.uid);

  const URL = "http://localhost:8080/user_names/" + id;
  const wsURL = "ws://localhost:8080/ws?id=" + id;
  const messagesURL = "http://localhost:8080/messages/" + id;
  const [webServer, setWs] = useState();

  const submitForm = (values) => {
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
      console.log(message);

      /*axios
        .post("http://localhost:8080/posts", {
          body: values.body,
        })
        .then(console.log({ receiver: receiver, body: values.body }))
        .catch((err) => console.log(err));*/
    }
  };

  const [messages, setmessages] = useState([]);
  const [users, setusers] = useState([]);
  const initialValues = { body: "" };

  useEffect(() => {
    const ws = new WebSocket(wsURL);
    ws.onopen = () => {
      console.log("WebSocket Connected");
      setWs(ws);
    };

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log("receivedmessage");
      console.log(message);
      setmessages((messages) => [message, ...messages]);
    };

    axios
      .get(messagesURL)
      .then((res) => {
        setmessages((messages) => {
          setmessages(res.data);
        });
        console.log(res);
      })
      .catch((err) => console.log(err));

    axios
      .get(URL)
      .then((res) => {
        setusers(res.data);
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
        width="15vw"
        height="10vh"
        minHeight="10vh"
        key={user}
        onClick={() => {
          setreceiver(user);
        }}
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
        maxHeight: "100vh",
      }}
    >
      <LoggedinNavbar />
      <h1>This is the chatPage</h1>
      <Flex style={{ flexGrow: 4, position: "relative", maxHeight: "100%" }}>
        <Flex
          direction="column"
          style={{
            overflowY: "scroll",
            position: "relative",
            maxHeight: "89vh",
            width: "15vw",
            minWidth: "15vw",
            minHeight: "89vh",
          }}
        >
          {tabs}
        </Flex>
        <Flex
          style={{
            flexDirection: "column",
            borderRadius: "25px",
            background: "#ffb44c",
            flexGrow: 3,
            position: "relative",
            maxHeight: "89vh",
            width: "80vw",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "3vh",
            marginRight: "0.5vw",
          }}
        >
          {receiver && (
            <ChatMessages
              messages={messages}
              receiver={receiver}
            ></ChatMessages>
          )}
          <Box margin="2vw">
            <Formik onSubmit={submitForm} initialValues={initialValues}>
              <Form>
                <Field name="body">
                  {({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <Input
                      width="75vw"
                      requiredtype="text"
                      id="body"
                      name="body"
                      marginRight="1vw"
                      {...field}
                    ></Input>
                  )}
                </Field>

                <Button marginBottom="1vh" type="submit">
                  Send
                </Button>
              </Form>
            </Formik>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatPage;
