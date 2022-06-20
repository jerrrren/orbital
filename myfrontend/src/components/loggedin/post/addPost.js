import React from "react";
import LoggedinNavbar from "../navigation/nav";

const Addpost = () => {
    return (
        <div>
            <LoggedinNavbar />
            <form>
                <div className="form-group">
                    <label for="exampleFormControlInput1">Your name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="your name" />
                </div>
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Project title</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Project intro</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label for="exampleFormControlInput1">Dateline</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Month day" />
                </div>
            </form>
        </div>
    )
}

export default Addpost
