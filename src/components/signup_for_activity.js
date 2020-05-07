import React from 'react'
import './css/signup_for_activity.css'

function toggle() {
    var signup = document.getElementById('signupForm');
    signup.classList.toggle('active');
}

const Signup = () => {
    return (
        <div id="signup-container">
            <button type="button" className="bounceInUp" onClick={toggle}>Sign Up!</button>
            <div id="signupForm">
                <form>
                    <div id="activityTitle">
                        <h1>Activity</h1>
                        <h2>Host Name</h2>
                    </div>
                    <h3>Time: </h3>
                    <h3>Date: </h3>
                    <br/>
                    <div id="childrenSignup">
                        <h3>Which Children would you like to sign up?</h3>
                        <input className="checkboxes" type="checkbox" id="ChildNames"/>
                        <label htmlFor="ChildNames">Tim</label>
                    </div>
                    <br/>
                    <h3>Contact Method</h3>
                    <div id="contactMethod">
                        <input className="checkboxes" type="checkbox" id="Email"/>
                        <label htmlFor="Email">Email</label>
                        <input className="checkboxes" type="checkbox" id="Text"/>
                        <label htmlFor="Text">Text</label>
                    </div>
                    <br/>
                    <div id="register">
                        <input id="signupSub" type="submit" value="Register"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup