import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login/login';
import Logout from './components/login/logout'
import LandingPage from './components/landingpage/landingpage'
import Register from "./components/register/register"
import LoggedInHome from './components/loggedin/home/home';
import FriendPage from './components/loggedin/friendPage/friendPage';
import ChatPage from './components/loggedin/chatPage/chatPage'

import { ChakraProvider } from '@chakra-ui/react'
import Contents from './components/loggedin/home/postContent';
import Addpost from './components/loggedin/post/addPost';

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/home/:id" element={<LoggedInHome />} />
          <Route path="/friends/:id" element={<FriendPage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/logout" exact element={<Logout />} />
          <Route path="/post/content/:id" element={<Contents />} />
          <Route path = "chat/:id"></Route>
          <Route path="/post/add" element={< Addpost />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
    
  );
}

export default App;
