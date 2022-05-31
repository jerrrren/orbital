import React from "react";
import Nav from "../navigation/navbar"
import './landingpage.css'


const LandingPage = () => {
    return (
        <div className="Overall">
            <Nav />
            <main>
                <h1 className="head">Welcome to IntroNus</h1>
                <p className="lead">A place where you can meet new people and form lasting bonds to you with your journey in school.</p>
            </main>
        </div>

    )
}

export default LandingPage