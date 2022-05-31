import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login/login';
import Logout from './components/login/logout'
import LandingPage from './components/ladingpage/landingpage'
import Register from "./components/registration/register"
import LoggedInHome from './components/loggedin/home/home';
import FriendPage from './components/loggedin/friendPage/friendPage';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/home/:id" element={<LoggedInHome />} />
          <Route path="/friends/:id" element={<FriendPage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/logout" exact element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
