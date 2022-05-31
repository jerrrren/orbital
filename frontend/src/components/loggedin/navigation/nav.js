import React from "react";
import { Link, useParams } from 'react-router-dom';
import FriendPage from "../friendPage/friendPage";
import axios from 'axios'

const LoggedinNavbar = () => {
    const params = useParams()

    const logout = () => {
        axios.post("/api/logout")
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 padding:0">
            <div className="container-fluid">
                <Link to={`/home/${params}`} className="navbar-brand">IntroNus</Link>
                <Link to={`/friends/${params}`} className="nav-link">Friends</Link>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={logout}>Logout</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/friends/${params}`} className="nav-link">Friends</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default LoggedinNavbar;