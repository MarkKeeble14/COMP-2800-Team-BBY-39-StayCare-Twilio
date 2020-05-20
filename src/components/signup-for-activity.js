import React from 'react'
import './css/signup_for_activity.css'
import './css/profile.css'
import $ from "jquery"
import {db} from "./js/firebase"
import { firebase } from "./js/firebase"

const Signup = () => {
    async function AddToActivities() {
        let key = $('#signup-form-activity-key').html();
        // console.log('signing up for an activity');
        const snapshot = await firebase.firestore().collection('activities').get();
        // console.log(snapshot.docs);
        for (let i = 0; i < snapshot.docs.length; i++) {
            if (snapshot.docs[i].data().key === key) {
                let activity = snapshot.docs[i].data();
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        // No more room
                        if (activity.occupants.length >= activity.size) {
                            alert('There is no more room in this activity. Sorry!');
                            return;
                        }
                        // already signed up for room
                        for (let j = 0; j < activity.occupants.length; j++) {
                            if (activity.occupants[j] === user.email) {
                                alert("You're already signed up for this activity");
                                return;
                            }
                        }
                        db.collection('activities').doc(snapshot.docs[i].id)
                            .update({
                                occupants: firebase.firestore.FieldValue.arrayUnion(user.email)
                            })
                    }

                    // Children
                    let childrenchecks = $(".child-select");
                    let childrenAdded = [];
                    for (let i = 0; i < childrenchecks.length; i++) {
                        var childname = childrenchecks.eq(i).val();
                        if ($("#" + childname + "-Check").is(":checked"))
                        {
                            // it is checked
                            childrenAdded.push(childname);
                        }
                    }

                    // Notifications
                    let contactchecks = $(".contact-select");
                    let contactsAdded = [];
                    for (let i = 0; i < contactchecks.length; i++) {
                        var contactname = contactchecks.eq(i).val();
                        if ($("#" + contactname).is(":checked"))
                        {
                            if (contactname === 'email-checkbox') {
                                contactsAdded.push('Email');
                            }
                            if (contactname === 'text-checkbox') {
                                contactsAdded.push('Text');
                            }
                        }
                    }

                    alert("You've signed up for " + activity.title + "!");
                    db.collection("users").doc(user.uid)
                    .update({
                        myActivities: firebase.firestore.FieldValue.arrayUnion({
                            mainActivity: activity,
                            contactInfo: contactsAdded,
                            childrenInfo: childrenAdded
                        }) //Add the result object to "my activities" database
                    });
                })
            }
        }
    }

    const handleForm = e => {
        e.preventDefault();
        AddToActivities();
        var signup = document.getElementById('signupForm');
        signup.classList.toggle('active');
    }

    function CloseSignup() {
        let signupForm = $('#signupForm');
        signupForm.removeClass('active');
    }

    return (
            <div id="signupForm">
                <form onSubmit={e => handleForm(e)}>
                    <div id="activityTitle">
                        <h1 id='signup-form-activity-title'>Activity</h1>
                        <h3 id='signup-form-activity-key'>Key</h3>
                        <h2 id='signup-form-activity-worker'>Host Name</h2>
                    </div>
                    <h3 id='signup-form-activity-time'>Time: </h3>
                    <div id="childrenSignup">
                        <h3>Which Children would you like to sign up?</h3>
                        <div className="children-response-container">
                        </div>
                    </div>
                    <h3>Contact Method</h3>
                    <div id="contactMethod">
                        <div className="contact-response-container">
                            <input type="checkbox" id="email-checkbox" name="email-checkbox" className='contact-select' value='email-checkbox'/>
                            <label htmlFor="email-checkbox">Email</label>
                            <input type="checkbox" id="text-checkbox" name="text-checkbox" className='contact-select' value='text-checkbox'/>
                            <label htmlFor="text-checkbox">Text</label>
                        </div>
                    </div>
                    <div id="register">
                        <input id="signupSub" type="submit" value="Register"/>
                        <input id="signupCancel" type="button" value="Cancel" onClick={CloseSignup}/>
                    </div>
                </form>
            </div>
    )
}

export default Signup