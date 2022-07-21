import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Login from './components/login/login'
import Logout from './components/login/logout'
import LandingPage from "./components/landingpage/landingpage";
import Register from './components/registration/register'

import LoggedInHome from './components/loggedin/home/home';
import FriendPage from './components/loggedin/friendPage/friendPage';
import ChatPage from './components/loggedin/chatPage/chatPage'

import Contents from './components/loggedin/home/postContent';
import Addpost from './components/loggedin/post/addPost';
import PairingPage from "./components/loggedin/findingPartner/findingpartner";


import PublicRoute from './routes/PublicRoute'
import PrivateRoute from "./routes/PrivateRoute";
import VerifyEmail from './components/emailverification/checkEmail';


function App() {

  const theme = extendTheme({
    components: {
      Button: {
        variants: {
          toggled: {
            background: "#ffb44c",
          },
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={<PublicRoute children={<Register />} />}
          />
          <Route
            path="/home"
            element={<PrivateRoute children={<LoggedInHome />} />}
          />
          <Route
            path="/friends"
            element={<PrivateRoute children={<FriendPage />} />}
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route path="/logout" element={<Logout />} />

          <Route
            path="/chat/:userId"
            element={<PrivateRoute children={<ChatPage />} />}
          />

          <Route
            path="/chat"
            element={<PrivateRoute children={<ChatPage />} />}
          />


          <Route path = "/post/content/:pid" element={<PrivateRoute children={<Contents  />} />}/>

          <Route
            path="/post/add"
            element={
              <PrivateRoute>
                <Addpost />
              </PrivateRoute>
            }
          />
          <Route path="/pairing/fillDetails" element={<PairingPage />} />

          <Route path="/verifyemail/:token" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
