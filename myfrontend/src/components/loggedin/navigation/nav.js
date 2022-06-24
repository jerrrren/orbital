import React from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

const LoggedinNavbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 padding:0">
            <div className="container-fluid">
                <Link to={`/home`} className="navbar-brand">IntroNus</Link>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link to={`/post/add`} className="nav-link">Add post</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Logout</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/friends`} className="nav-link">Friends</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default LoggedinNavbar;
