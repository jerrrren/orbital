import React from "react";
import { Link } from "react-router-dom";

const Post = (props) => {
    return (
        <div className="col-md-6">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
                <div className="card-body d-flex flex-column align-items-start">
                    <strong className="d-inline-block mb-2 text-primary">{props.value.Field}</strong>
                    <h3 className="mb-0">
                        <a className="text-dark" href="#">{props.value.Name}</a>
                    </h3>
                    <div className="mb-1 text-muted">May 22</div>
                    <p className="card-text mb-auto">{props.value.Intro}</p>
                    <Link to={`/post/content/${props.value.ID}`}>Find group</Link>
                </div>
            </div>
        </div >
    )
}

export default Post