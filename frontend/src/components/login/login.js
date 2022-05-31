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

    const submit = (e) => {
        e.preventDefault()

        axios.post("/api/signin", {
            "username": name,
            "password": password
        })
            .then(resp => {
                console.log(resp)
                setRedirect(true)
                setId(resp.data.userID)
            })
            .catch(err => console.log(err))
    }

    if (redirect) {
        return <Navigate to={`/home/${id}`} replace={true} />
    }

    return (
        <div className="login">
            <Nav />
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