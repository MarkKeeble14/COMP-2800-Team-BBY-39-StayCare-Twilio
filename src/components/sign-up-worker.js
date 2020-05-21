import React, { useState, useContext } from "react";
import { firebase } from "./js/firebase"
import { db } from "./js/firebase"
import { generateUserDocument } from "./js/firebase"
import "./css/temp.css"

const AuthContext = React.createContext(null);

// Worker Signup Form
const WorkerSignup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phNumber, setPhNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");
  
    const Auth = useContext(AuthContext);
    
    const handleForm = e => {
        e.preventDefault();

        //If the worker terms and conditions are checked create a new Worker
        if (document.getElementById('worker-terms').checked) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(res => {
                    const fields = { //Sets the user information from the form submitted
                        firstName: firstName,
                        lastName: lastName,
                        phoneNumber: phNumber,
                        isWorker: true
                    }
                    generateUserDocument(res.user, fields)
                    .then(result => function() {
                    db.collection('users').add(result); //Adds the user information to the database
                    }).then(res => { //Once the user information is added, the page will refresh itself
                        window.location.replace("./");
                    });
                })
                .catch(e => {
                    setErrors(e.message);
                });
        } else {
            alert('please accept the terms and conditions');
        }
    };

    return (
        <form id="worker-form" className="signup-form inactive" onSubmit={e => handleForm(e)}>
            <p>Worker Signup</p>
            <input 
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                name="first-name"
                type="text"
                placeholder="First Name"
            />
            <input 
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                name="last-name"
                type="text"
                placeholder="Last Name"
            />
            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                name="email"
                type="email"
                placeholder="Email"
            />
            <input
                onChange={e => setPassword(e.target.value)}
                name="password"
                value={password}
                type="password"
                placeholder="Password"
            />
            <input 
                value={phNumber}
                onChange={e => setPhNumber(e.target.value)}
                name="phNumber"
                type="tel"
                placeholder="Phone Number (Format: 123-456-7890)"
            />
            <input type="checkbox" id="worker-terms" name="terms" value=""/>
            <label htmlFor="worker-terms">I agree to the terms and conditions</label>
            <div className="box">
                <input type="submit" className="btn btn-white btn-animation-1"/>
            </div>
            <span>{error}</span>
        </form>
    )
}

export default WorkerSignup