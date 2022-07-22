import React from "react";
import { useState } from "react";
import axios from "axios";
import { url } from "../../../constants/url";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

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
      <form onSubmit={(e) => submit(e)}>
        <div className="form-group">
          <label>Project title</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) => setField(e.target.value)}
            placeholder="Project title"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Project intro</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) => setIntro(e.target.value)}
            placeholder="Brief description of what this project is about"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) => setContent(e.target.value)}
            placeholder="describe in the project in detail and the type of teammates you are looking for"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Number Of Participants</label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="1"
            onChange={(e) => setParticipants(parseInt(e.target.value))}
            placeholder="The number of participants required for the project"
          ></input>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addpost;
