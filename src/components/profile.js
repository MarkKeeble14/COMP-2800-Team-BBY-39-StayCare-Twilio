import React from "react"
import "./css/profile.css"
import $ from "jquery"
import {db} from "./js/firebase"
import {firebase} from "./js/firebase"
import { useQueryParam, StringParam } from "use-query-params";

const Profile = () => {
    const [profile, setProfile] = useQueryParam("profile", StringParam);
    if (profile !== undefined) {
        db.collection('users').doc(profile).get()
        .then(function (result) {
            if (result.data().isWorker !== undefined) {
                DisplayProfile(result);
            } else {
                console.log('you do not have permission to view this profile. You will see your own.');
                LoadChildren();
                FillOutProfileData();
            }
        })
        .catch(function(error){
            console.log(error);
        })
    } else {
        LoadChildren();
        FillOutProfileData();
    }

    function DisplayProfile(snap) {
        let role;
        if (!snap.data().isWorker) {
            $('.child-box').removeClass('inactive');
            role = 'Parent';
        } else {
            role = 'Worker';
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    db.collection('users').doc(user.uid).get()
                    .then(function(userRef) {
                        if (!userRef.data().isWorker) {
                            $('#favorite-worker').removeClass('inactive');
                        }
                    })
                } 
            })
        }
        $('#display-name').text(snap.data().firstName + ', ' + role);
        $('#email').val(snap.data().email);
        $('#phone-number').val(snap.data().phoneNumber);
    }
    
    function FillOutProfileData() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user !== null) {
                db.collection("users").doc(user.uid).get()
                .then(function (snap) {
                    DisplayProfile(snap);
                });
            }
        })
    }
    
    function LoadChildren() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user !== null) {
                db.collection("users").doc(user.uid).get()
                .then(function (snap) {
                    if (snap.data().children !== undefined) {
                        for (let i = 0; i < snap.data().children.length; i++) {
                            AddChild(snap.data().children[i]);
                        }
                    }
                })
            }
        })
    }

    function LoadWorkerActivities() {
        let workerEmail;
        let intervel = null;
        
        intervel = setInterval(function(){ 
            workerEmail = $('#email').val();
            if (workerEmail != undefined && workerEmail != '') {
                db.collection("activities").get()
                .then(function (snap) {      
                    snap.forEach(function (activity) {
                        if (activity.data().worker === workerEmail) {
                            CreateCreatedActivity(activity.data().title, activity.data().time, activity.data().key, activity.data().worker);
                        }
                    })
                    clearInterval(intervel);
                })
            }
        }, 250);
    }
    
    LoadWorkerActivities();

    function CreateCreatedActivity(title, time, key, worker) {
        let id = key + "-profile-activity";
        let buttonID = "profile-signup-" + key;
        $('#profile-created-activities').append("<div id='" + id + "'></div>");
        $("#" + id).append("<p>" + title + " - " + time + "</p>");
        $("#" + id).append("<div class='box'><input type='button' id='" + buttonID + 
            "' class='btn btn-white btn-animation-1 middled-button inactive' value='Sign Up!'/>");

        function AddSignupListener() {
            $("#" + buttonID).on('click', function() {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user != null) {
                        db.collection("users").doc(user.uid).get()
                        .then(function (snap) {
                            $('.children-response-container').replaceWith("<div class='children-response-container'></div>");
                            if (snap.data().children !== undefined) {
                                for (let i = 0; i < snap.data().children.length; i++) {
                                    let child = snap.data().children[i];
                                    let id = child + '-Check';
                                    $('.children-response-container').append("<input type='checkbox' class='child-select' id='" + id + 
                                    "' name='" + id + "' value='" + child + "'/>" +
                                    "<label for='" + id + "'>" + child + "</label>");
                                }

                                let signupForm = $('#signupForm');
                                if (signupForm.hasClass('active')) {
                                    signupForm.removeClass('active');
                                } else {
                                    signupForm.addClass('active');
                                }
                                
                                $('#signup-form-activity-title').html(title);
                                $('#signup-form-activity-key').html(key);
                                $('#signup-form-activity-worker').html(worker);
                                $('#signup-form-activity-time').html(time);
                            } else {
                                alert("You don't currently have any children attached to your account.");
                            }
                        })
                    }
                })
            })
        }
        // 
        firebase.auth().onAuthStateChanged(function (user) {
            if (user != null) {
                db.collection("users").doc(user.uid).get()
                .then(function (userRef) {
                    if (!userRef.data().isWorker) {
                        AddSignupListener();
                        $("#" + buttonID).removeClass('inactive');
                    }
                })
            }
        })
    }

    const handleForm = e => {
        e.preventDefault();
        let children = $("input[class='childname']");
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                for (let i = 0; i < children.length; i++) {
                    var Subject = children.eq(i).val();
                    console.log(Subject + ' added to your children!');
                    db.collection("users").doc(user.uid)
                        .update({
                            children: firebase.firestore.FieldValue.arrayUnion(Subject)
                        });
                }
            } else {
                alert('please login or signup for an account');
            }
        })
    };

    function AddChild(name) {
        $('#child-form').prepend(" <input type='text' class='childname' placeholder='Child' value='" + name + "'></input> ");
    }

    return (
        <div id="profile-card">
            <div className="image-container">
                <img src="https://dummyimage.com/600x400/000/fff" alt="user-pic" width="100%" id="profile-pic"/>
                <div className="title">
                    <h2 id="display-name"></h2>
                </div>
            </div>
            <div className="main-container">
                <div className="textbox label">
                    <label htmlFor='email'>Email</label>
                    <input type="email" placeholder="Email" id="email" name='email'/>
                </div>
                <div className="textbox label">
                    <label htmlFor='phone-number'>Phone Number</label>
                    <input type="text" placeholder="Phone Number" id="phone-number" name='phone-number'/>
                </div>
                <div id='profile-created-activities'>
                </div>
                <div className="box">
                    <input type="button" className="btn btn-white btn-animation-1 inactive middled-button" id='favorite-worker' value='Favorite This Worker!'/>
                </div>
                <div className="child-box inactive">
                    <div className="box">
                        <input type="button" className="btn btn-white btn-animation-1 middled-button" id='add-child' 
                        value='Add Child' onClick={() => AddChild('')}/>
                    </div>
                    <p id='child-box-title'>Children</p>
                    <form id='child-form' onSubmit={e => handleForm(e)}>
                        <div className="box">
                            <input type="submit" className="btn btn-white btn-animation-1 middled-button"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile