import React from 'react'
import './css/signup_for_activity.css'
import './css/profile.css'

function toggle() {
    var signup = document.getElementById('signupForm');
    console.log(signup);
    signup.classList.toggle('active');

    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
}

const Signup = () => {
    return (
        <div id="signup-container">
            <button type="button" className="bounceInUp" onClick={toggle}>Sign Up for Activity!</button>
            <div id="signupForm">
                <form>
                    <div id="activityTitle">
                        <h1>Activity</h1>
                        <h2>Host Name</h2>
                    </div>
                    <h3>Time: </h3>
                    <h3>Date: </h3>
                    <div id="childrenSignup">
                        <h3>Which Children would you like to sign up?</h3>
                        <div className="response-container">
                            <input className="checkboxes" type="checkbox" id="ChildNames"/>
                            <label htmlFor="ChildNames">Tim</label>
                        </div>
                    </div>
                    <h3>Contact Method</h3>
                    <div id="contactMethod">
                    <div className="response-container">
                        <input className="checkboxes" type="checkbox" id="Email"/>
                        <label htmlFor="Email">Email</label>
                        <input className="checkboxes" type="checkbox" id="Text"/>
                        <label htmlFor="Text">Text</label>
                        </div>
                    </div>
                    <div id="register">
                        <input id="signupSub" type="submit" value="Register"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup