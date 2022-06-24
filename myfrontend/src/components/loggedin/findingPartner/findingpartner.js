import React, { useState, useEffect } from "react";
import LoggedinNavbar from "../navigation/nav";
import axios from "axios";
import './findingPartner.css'
import { isInteger } from "formik";
import { AccordionDescendantsProvider } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import WaitingPage from "../waiting/waitingPage";
import ChatPage from "../chatPage/chatPage";

const PairingPage = () => {
    const [commitment, setCommitment] = useState(1)
    const [location, setLocation] = useState("")

    const [single, setSingle] = useState(true)
    const [paired, setPaired] = useState(false)
    const [partner, setPartner] = useState("")

    const submit = (e) => {
        e.preventDefault()
        //adds info about the indicators and try to find a matching if possible
        axios.post("/pairing/fillIndicators", {
            "Name": localStorage.getItem("username"),
            "Commitment": parseInt(commitment),
            "Location": location.toLowerCase()
        })
            .then(resp => {
                setSingle(false)
                axios.post("/pairing/match", { "Name": localStorage.getItem("username") })
                    .then(resp => {
                        setPaired(resp.data.result)
                        setPartner(resp.data.message)
                    })
                    .catch(resp => console.log(resp))
            })
            .catch(resp => { console.log(resp) })
    }

    if (paired) {
        axios.all([
            axios.post("/pairing/deleteSingleUser", { "Name": localStorage.getItem("username") }),
            axios.post("/pairing/deleteSingleUser", { "Name": partner }),
            axios.post("/pairing/addPairedUser", {
                "Name": localStorage.getItem("username"),
                "Partner": partner
            })
        ]).then(axios.spread((resp1, resp2, resp3) => {
            console.log(resp1, resp2, resp3)
        })).catch(err => console.log(err))
    }
    return (
        <div>
            {single ? (<div><LoggedinNavbar />
                <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
                    <div className="col-md-6 px-0">
                        <h1 className="display-4 font-italic">Welcome to the pairing page!</h1>
                    </div>
                </div>
                <h1 className="normal">Fill up the details below to get paired</h1>
                <div className="business">
                    <form onSubmit={e => submit(e)}>

                        <div className="form-floating">
                            <input type="text" className="form-control" placeholder="Name" required
                                onChange={e => setCommitment(e.target.value)}
                            />
                            <label htmlFor="floatingInput">Commitment Level(1-5)</label>
                        </div>

                        <div className="form-floating">
                            <input type="text" className="form-control" placeholder="Password" required
                                onChange={e => setLocation(e.target.value)}
                            />
                            <label htmlFor="floatingPassword">Location (North/South/East/Central/West)</label>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>

                    </form>
                </div></div>) : (<div>{paired ? <ChatPage /> : <WaitingPage />}</div>)}
        </div >
    )
}

export default PairingPage