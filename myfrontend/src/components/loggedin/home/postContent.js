import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggedinNavbar from "../navigation/nav";
import axios from "axios";

const Contents = () => {
    const id = useParams()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    // console.log(id)
    // useEffect(() => {
    //     axios.get(`/posts/getPosts/${id}`)
    //         .then(resp => console.log(resp))
    //         .catch(err => console.log(err))
    // }, [])

    return (

        < div >
            <LoggedinNavbar />
            <div>
                This is the detailed post page
            </div>
        </div >
    )
}

export default Contents