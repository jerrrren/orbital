import React, { useState, useEffect } from "react";
import LoggedinNavbar from "../navigation/nav";
import axios from "axios";
import "./findingPartner.css";
import { url } from "../../../constants/url";
import { isInteger } from "formik";
import { AccordionDescendantsProvider } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import ChatPage from "../chatPage/chatPage";

const COMMITMENT = ["1", "2", "3", "4", "5"]
const LOCATION = ["north", "south", "east", "west", "central"]
const YEAR = ["1", "2", "3", "4"]
const FACULTY = ["science", "business", "computing", "dentistry", "engineering", "law", "medicine", "nursing", "music"]

const PairingPage = () => {
  const [commitment, setCommitment] = useState(1);
  const [location, setLocation] = useState("");

  const [paired, setPaired] = useState(false);
  const [partner, setPartner] = useState("");
  const [pairingSuccess, setPairingSuccess] = useState(true);
  const [year, setYear] = useState("")
  const [faculty, setFaculty] = useState("")
  const [sameFaculty, setSameFaculty] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    axios
      .post(url.if_paired, {
        Name: username,
      })
      .then((resp) => {
        setPaired(resp.data.message);
        setPartner(resp.data.partner);
      })
      .catch((err) => console.log(err));
  }, []);

  const check = () => {
    setLocation(location.toLowerCase())
    setFaculty(faculty.toLowerCase())
    if (!COMMITMENT.includes(commitment)) {
      setPairingSuccess(false)
      setErrMsg("Please input a valid commitment level")
      return false
    }

    if (!LOCATION.includes(location.toLowerCase())) {
      setPairingSuccess(false)
      setErrMsg("Please input a valid location")
      return false
    }

    if (!YEAR.includes(year)) {
      setPairingSuccess(false)
      setErrMsg("Please input a valid year")
      return false
    }

    if (!FACULTY.includes(faculty)) {
      setPairingSuccess(false)
      setErrMsg("Please input a valid faculty")
      return false
    }

    return true
  }

  const submit = (e) => {
    e.preventDefault();
    //adds info about the indicators and try to find a matching if possible
    if (check()) {
      axios
        .post(url.fill_and_match, {
          Name: username,
          Commitment: parseInt(commitment),
          Year: parseInt(year),
          Location: location.toLowerCase(),
          Faculty: faculty.toLowerCase(),
          SameFaculty: sameFaculty,
        })
        .then((resp) => {
          console.log(resp.data);
          setPaired(resp.data.result);
          setPartner(resp.data.message);
          setPairingSuccess(resp.data.result);
          if (!resp.data.result) {
            setErrMsg("Not enough users to pair you, please try again later")
          }
        })
        .catch((err) => console.log(err));
    }

  };

  return (
    <div>
      {paired ? (
        <div>
          <LoggedinNavbar />
          <div className="jumbotron p-3 p-md-5 text-white bg-dark">
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
                  {errMsg}
                </div>
              </div>
            )}
            <div className="jumbotron p-3 p-md-5 text-white bg-dark">
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
                  <label htmlFor="floatingInput">Commitment Level(1/2/3/4/5)</label>
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
                    Location (North/South/East/West/Central)
                  </label>
                </div>

                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Password"
                    required
                    onChange={(e) => setYear(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">
                    Year (1/2/3/4)
                  </label>
                </div>

                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Password"
                    required
                    onChange={(e) => setFaculty(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">
                    Faculty (Science/Business/Computing/Dentistry/Engineering/Law/Medicine/Nursing/Music)
                  </label>
                </div>

                <div className="flex">
                  <div className="checkbox-inline">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => setSameFaculty(!sameFaculty)} />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      Pair me with someone of my faculty
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-sm">
                    Submit
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div >
      )}
    </div >
  );
};

export default PairingPage;
