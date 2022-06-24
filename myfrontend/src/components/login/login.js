import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Nav from "../../components/navigation/navbar"
import './login.css'

const Login = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [id, setId] = useState(0)
    const [redirect, setRedirect] = useState(false)
    const [err, setErr] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [username, setUsername] = useState("")

    const submit = (e) => {
        e.preventDefault()

        axios.post("http://localhost:8080/users/login", {
            "username": name,
            "password": password
        })
            .then(resp => {
                setRedirect(true)
                setId(resp.data.uid)
                setUsername(resp.data.username)
            })
            .catch(err => {
                console.log(err)
                setErr(true)
                setErrMsg(err.response.data.message)
            })
    }

    if (redirect) {
        localStorage.setItem("username", username)
        return <Navigate to={`/home`} replace={true} />
    }

    return (
        <div className="login">
            <Nav />
            {err ? (
                <div className="alert alert-danger" role="alert">
                    {errMsg}
                </div>) :
                (<div></div>)}
            <main className="form-signin w-100 m-auto">
                <form onSubmit={e => submit(e)}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Name" required
                            onChange={e => setName(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Username</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Password" required
                            onChange={e => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>

                </form>
            </main>
        </div>

    )
}

export default Login
