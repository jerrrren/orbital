import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoggedinNavbar from "../navigation/nav";
import PairingPage from "../findingPartner/findingpartner";
import axios from "axios";
import WaitingPage from "../waiting/waitingPage";
import ChatPage from "../chatPage/chatPage";
import { url } from "../../../constants/url";


//page to be loaded when friend button on navbar is chosen
//will either load the findPartner page, waiting page or the chat page
const FriendPage = () => {
  const [paired, setPaired] = useState(false);
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    axios
      .post(url.if_paired, {
        Name: username,
      })
      .then((resp) => {
        setPaired(resp.data.message);
      })
      .catch((err) => console.log(err));
  }, []);

  if (paired) {
    var temp = "/chat/" + sessionStorage.getItem("partnerID")
    return <Navigate to={temp} replace={true} />;
  }

  return (
    <div>
      <div>
        <LoggedinNavbar />
        <div className="jumbotron p-3 p-md-5 text-white bg-dark">
          <div className="col-md-6 px-0">
            <h1 className="display-4 font-italic">
              You have yet to be paired, please go to the pair tab on the
              navigation bar
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendPage;
