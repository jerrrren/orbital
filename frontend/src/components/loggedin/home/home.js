import React from "react";
import LoggedinNavbar from "../navigation/nav";
import './home.css'

const LoggedInHome = () => {
    return (
        <div className="innerhome">
            <LoggedinNavbar />
            <div>
                <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
                    <div className="col-md-6 px-0">
                        <h1 className="display-4 font-italic">Welcome to IntroNus, Batman</h1>
                        <p className="lead my-3">Scroll down around here to find the latest school events</p>
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-md-6">
                        <div className="card flex-md-row mb-4 box-shadow h-md-250">
                            <div className="card-body d-flex flex-column align-items-start">
                                <strong className="d-inline-block mb-2 text-primary">Computing</strong>
                                <h3 className="mb-0">
                                    <a className="text-dark" href="#">Orbital project</a>
                                </h3>
                                <div className="mb-1 text-muted">May 22</div>
                                <p className="card-text mb-auto">Click in to indicate interest and we can help you to find a group!</p>
                                <a href="#">Find group</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card flex-md-row mb-4 box-shadow h-md-250">
                            <div className="card-body d-flex flex-column align-items-start">
                                <strong className="d-inline-block mb-2 text-success">Computing</strong>
                                <h3 className="mb-0">
                                    <a className="text-dark" href="#">Hackathon</a>
                                </h3>
                                <div className="mb-1 text-muted">June 22</div>
                                <p className="card-text mb-auto">Hackathon held in the break</p>
                                <a href="#">Click to view more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoggedInHome