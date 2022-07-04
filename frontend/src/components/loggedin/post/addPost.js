import React from "react";
import { useState } from "react";
import axios from "axios";
import { url } from "../../../constants/url";

import LoggedinNavbar from "../navigation/nav";

const Addpost = () => {
  const [field, setField] = useState("");
  const [name,setName] = useState("");
  const [intro,setIntro] = useState("");
  const [content,setContent] = useState("");
  
  const submit = (e) => {
    e.preventDefault();
    axios
      .post(url.add_post, {
        Name: name,
        Field: field,
        Intro: intro,
        Content: content
      })
      .then((resp) => {
        console.log(resp);
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
          <label >Your name</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label >Project title</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) => setField(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label >Project intro</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) => setIntro(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label >Description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addpost;
