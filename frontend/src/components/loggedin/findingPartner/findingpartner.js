import React, { useState, useEffect } from "react";
import LoggedinNavbar from "../navigation/nav";
import axios from "axios";
import "./findingPartner.css";
import { url } from "../../../constants/url";
import { isInteger } from "formik";
import { AccordionDescendantsProvider } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import WaitingPage from "../waiting/waitingPage";
import ChatPage from "../chatPage/chatPage";

const PairingPage = () => {
  const [commitment, setCommitment] = useState(1);
  const [location, setLocation] = useState("");

  const [paired, setPaired] = useState(false);
  const [partner, setPartner] = useState("");
  const [pairingSuccess, setPairingSuccess] = useState(true);
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .post(url.if_paired, {
        Name: username,
      })
      .then((resp) => {
        setPaired(resp.data.message);
        setPartner(resp.data.partner);
        console.log(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    //adds info about the indicators and try to find a matching if possible
    axios
      .post(url.fill_and_match, {
        Name: username,
        Commitment: parseInt(commitment),
        Location: location.toLowerCase(),
      })
      .then((resp) => {
        console.log(resp.data);
        setPaired(resp.data.result);
        setPartner(resp.data.message);
        setPairingSuccess(resp.data.result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {paired ? (
        <div>
          <LoggedinNavbar />
          <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
            <div className="col-md-6 px-0">
              <h1 className="display-4 font-italic">
                You have already been paired with {partner}, please proceed to
                the friends page to chat!
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <LoggedinNavbar />
            {pairingSuccess ? (
              <div></div>
            ) : (
              <div>
                <div className="alert alert-danger" role="alert">
                  Not enough users to pair you, please try again later
                </div>
              </div>
            )}
            <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
              <div className="col-md-6 px-0">
                <h1 className="display-4 font-italic">
                  Welcome to the pairing page!
                </h1>
              </div>
            </div>
            <h1 className="normal">Fill up the details below to get paired</h1>
            <div className="business">
              <form onSubmit={(e) => submit(e)}>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    required
                    onChange={(e) => setCommitment(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Commitment Level(1-5)</label>
                </div>

                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Password"
                    required
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">
                    Location (North/South/East/Central/West)
                  </label>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PairingPage;
