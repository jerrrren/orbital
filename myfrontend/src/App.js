import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react";

import Login from './components/login/login'
import Logout from './components/login/logout'
import LandingPage from "./components/landingpage/landingpage";
import Register from './components/registration/register'

import LoggedInHome from './components/loggedin/home/home';
import FriendPage from './components/loggedin/friendPage/friendPage';
import ChatPage from './components/loggedin/chatPage/chatPage'

import Contents from './components/loggedin/home/postContent';
import Addpost from './components/loggedin/post/addPost';
import WaitingPage from './components/loggedin/waiting/waitingPage';
import PairingPage from './components/loggedin/findingPartner/findingpartner';

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/register" exact element={<Register />} />


          <Route path="/home" element={<LoggedInHome />} />
          <Route path="/friends" element={<FriendPage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/logout" exact element={<Logout />} />
          <Route path="/post/content/:id" element={<Contents />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/post/add" element={<Addpost />} />
          <Route path="/pairing/fillDetails" element={<PairingPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
