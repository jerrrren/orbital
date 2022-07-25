import React from "react";
import { useState } from "react";
import axios from "axios";
import { url } from "../../../constants/url";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Flex, Box, Button, Textarea } from "@chakra-ui/react";

import LoggedinNavbar from "../navigation/nav";

const Addpost = () => {
  const [field, setField] = useState("");
  const [intro, setIntro] = useState("");
  const [content, setContent] = useState("");
  const [numOfParticipants,setParticipants] = useState(null)
  const id = parseInt(useAuth((state) => state.uid));
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    console.log(typeof (numOfParticipants));
    axios
      .post(url.add_post, {
        UID: id,
        Field: field,
        Intro: intro,
        Content: content,
        NumParticipants: numOfParticipants,
      })
      .then((resp) => {
        console.log(resp);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <LoggedinNavbar />

      <Flex
        background="#ffb44c"
        justifyContent="center"
        padding="5"
        height="94.2vh"
        alignItems="center"
      >
        <Box
          background="#F0FFFF"
          padding="5"
          borderRadius="15px"
          width="50vw"
          height="85vh"
        >
          <form onSubmit={(e) => submit(e)}>
            <div className="form-group" style={{ margin: "15px" }}>
              <label style={{ fontWeight: "bold" }}>Project title</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="1"
                onChange={(e) => setField(e.target.value)}
                placeholder="Project title"
              ></textarea>
            </div>
            <div className="form-group" style={{ margin: "15px" }}>
              <label style={{ fontWeight: "bold" }}>Project Intro</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
                onChange={(e) => setIntro(e.target.value)}
                placeholder="Brief description of what this project is about"
              ></textarea>
            </div>
            <div className="form-group" style={{ margin: "15px" }}>
              <label style={{ fontWeight: "bold" }}>Description</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="16"
                onChange={(e) => setContent(e.target.value)}
                placeholder="Describe the project in detail and the type of teammates you are looking for"
              ></textarea>
            </div>
            <div className="form-group" style={{ margin: "15px" }}>
              <label style={{ fontWeight: "bold" }}>
                Number Of Participants
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="1"
                onChange={(e) => setParticipants(parseInt(e.target.value))}
                placeholder="The number of participants required for the project"
              ></input>
            </div>
            <Flex justifyContent="center">
              <Button type="submit" width="46.5vw" marginTop="3vh">
                Submit
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </div>
  );
};

export default Addpost;
