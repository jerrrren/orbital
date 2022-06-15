import React, { useState, useEffect } from "react";
import axios from "axios";
import {Formik,Form,Field} from "formik";

import LoggedinNavbar from "../navigation/nav";
import { Button, Flex, Input, Box,Heading,Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import ChatMessages from "./chatMessages"

const ChatPage = () => {
  const ws = new WebSocket("ws://localhost:8080/ws/chekc")
  
  const [receiver,setreceiver] = useState("")
  
  const submitForm = (values) => {
     if(receiver!=""){
      setmessages((messages) => [
        ...messages,
        { receiver: receiver, body: values.body },
      ]);
      axios
        .post("http://localhost:8080/posts", {
          body: values.body,
        })
        .then(console.log({ receiver: receiver, body: values.body }))
        .catch((err) => console.log(err));
     }
  }
  

  const [messages, setmessages] = useState([]);
  const [users, setusers] = useState([]);
  const initialValues = { body: ""};

  const { id } = useParams();
  const URL = "http://localhost:8080/user_names/" + id  

   useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        setusers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const tabs = users.map((user) => (
    <Button width="15vw" height="10vh" minHeight="10vh" key={user} onClick={()=>{
      setreceiver(user.username)
    }}>
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
          <ChatMessages messages={messages} receiver={receiver}></ChatMessages>

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
