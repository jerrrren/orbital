import React, { useState } from "react";
import LoggedinNavbar from "../navigation/nav";
import { Link, Navigate } from "react-router-dom";
import ChatPage from "../chatPage/chatPage";
import axios from "axios";

//page to wait while trying to get more users for pairing
const WaitingPage = () => {
    const [wait, setWait] = useState(true)
    const [partner, setPartner] = useState("")

    const submit = (e) => {
        e.preventDefault()
        axios.post("/pairing/match", { "Name": localStorage.getItem("username") })
            .then(resp => {
                setWait(!resp.data.result)
                setPartner(resp.data.message)
            })
            .catch(resp => console.log(resp))
    }

    if (!wait) {
        //delete user fro sinlge user and add to paireduser table
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
            {wait ? (<div><LoggedinNavbar />
                <form onSubmit={e => submit(e)}>
                    <div className="textbox">
                        <div className="textbox">
                            <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
                                <div className="col-md-6 px-0">
                                    <h1 className="display-4 font-italic">Sorry, we have ran out of users, please press the button below later to try again</h1>
                                </div>
                            </div>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Try again</button>
                    </div>
                </form></div>) : (<ChatPage />)}

        </div>
    )
}

export default WaitingPage