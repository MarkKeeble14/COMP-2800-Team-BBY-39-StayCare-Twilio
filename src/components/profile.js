import React from "react"
import "./css/profile.css"

const Profile = () => {
    return (
        <div id="profile-card">
            <div className="image-container">
                <img src="https://dummyimage.com/600x400/000/fff" alt="user-pic" width="100%"/>
                <div className="title">
                    <h2>John Doe</h2>
                </div>
            </div>
            <div className="main-container">
                <div className="textbox label">
                    <i className="fa fa-compass info"></i>
                    <input type="text" placeholder="Location"/>
                </div>
                <div className="textbox label">
                    <i className="fa fa-envelope-square info"></i>
                    <input type="text" placeholder="Email"/>
                </div>
                <div className="textbox label">
                    <i className="fa fa-phone info"></i>
                    <input type="text" placeholder="Phone Number"/>
                </div>
                <div className="textbox">
                    <div className="textbox">
                        <div className="label">
                            <i className="fa fa-child info"></i>
                            <p>Children</p>
                        </div>
                        <div id="child-container">
                            <img src="https://dummyimage.com/400x400/000/fff" alt="pic" className="rounded-circle"/>
                            <img src="https://dummyimage.com/400x400/000/fff" alt="pic" className="rounded-circle"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile