import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoggedinNavbar from "../navigation/nav";
import PairingPage from "../findingPartner/findingpartner";
import axios from "axios";
import WaitingPage from "../waiting/waitingPage";
import ChatPage from "../chatPage/chatPage";

//page to be loaded when friend button on navbar is chosen
//will either load the findPartner page, waiting page or the chat page
const FriendPage = () => {
    const [single, setSingle] = useState(false)
    const [filled, setFilled] = useState(false)
    const username = localStorage.getItem("username")

    useEffect(() => {
        axios.post("/pairing/checkInfo", {
            "Name": username
        })
            .then(resp => {
                setSingle(resp.data.single)
                setFilled(resp.data.filled)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            {!single ? (<ChatPage />) : (<div>{filled ? (<WaitingPage />) : (<PairingPage />)}</div>)}
        </div>

    )

    // if (single && !filled) {
    //     //return finding partner form page
    //     return <Navigate to={`/pairing/fillDetails`} replace={true} />
    // } else if (single && filled) {
    //     //return waiting page 
    //     return <Navigate to={`/pairing/waiting`} replace={true} />
    // } else {
    //     return <Navigate to={`/chat/${1}`} replace={true} />
    // }
}

export default FriendPage