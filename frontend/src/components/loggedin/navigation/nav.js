import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const LoggedinNavbar = () => {

  const userLogout = useAuth((state) => state.logout);

  const logout = () => {
    axios
      .post("/api/logout")
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err));
    userLogout();
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 padding:0">
      <div className="container-fluid">
        <Link to={`/home`} className="navbar-brand">
          IntroNus
        </Link>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link to={`/post/add`} className="nav-link">
                Add post
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={logout}>
                Logout
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/friends`} className="nav-link">
                Friends
              </Link>
            </li>

            <li className="nav-item">
              <Link to={`/chat`} className="nav-link">
                Chat
              </Link>
            </li>

            <li className="nav-item">
              <Link to={`/pairing/fillDetails`} className="nav-link">
                Pair
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default LoggedinNavbar;
