import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./register.css";
import Nav from "../navigation/navbar";
import { url } from "../../constants/url";
import validator from "validator";


const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState("");

  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setErr(true);
      setErrMsg("Please verify that the email is in a correct format");
      return;
    }
    axios
      .post(url.signup, {
        Username: name,
        Password: password,
        User_type: "user",
        Email:email
      })
      .then((resp) => {
        console.log(resp);
        setRedirect(true);
        axios
          .post(url.register_add, {
            Name: name,
          })
          .then((resp) => console.log(resp))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErr(true);
        setErrMsg(err.response.data.message);
      });
  };

  if (redirect) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="register" style={{ height: "100vh" }}>
      <Nav />
      {err ? (
        <div className="alert alert-danger" role="alert">
          {errMsg}
        </div>
      ) : (
        <div></div>
      )}
      <main className="form-signin w-100 m-auto">
        <form onSubmit={(e) => submit(e)}>
          <h1 className="h3 mb-3 fw-normal">Welcome aboard!</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              minLength={5}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              minLength={7}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Register
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
