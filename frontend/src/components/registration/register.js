import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./register.css";
import Nav from "../../components/navigation/navbar";

const Register = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [err, setErr] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    const submit = (e) => {
        e.preventDefault()

        axios
          .post("http://localhost:8080/users/signup", {
            username: name,
            password: password,
          })
          .then((resp) => {
            console.log(resp);
            setRedirect(true);
          })
          .catch((err) => {
            setErr(true);
            setErrMsg(err.response.data.error);
          });
    }

    if (redirect) {
        return <Navigate to="/login" replace={true} />
    }

    return (
        <div className="register">
            <Nav />
            {err ? (
                <div class="alert alert-danger" role="alert">
                    {errMsg}
                </div>) :
                (<div></div>)}
            <main className="form-signin w-100 m-auto">
                <form onSubmit={e => submit(e)}>
                    <h1 className="h3 mb-3 fw-normal">Welcome aboard!</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Name" minLength={5} required
                            onChange={e => setName(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Username</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Password" minLength={7} required
                            onChange={e => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>

                </form>
            </main>
        </div>

    )
}

export default Register
