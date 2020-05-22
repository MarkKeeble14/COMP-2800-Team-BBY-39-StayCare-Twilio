import React from "react"
import $ from "jquery"
import { useQueryParam, StringParam } from "use-query-params";
import { db } from "../../js/firebase"
import { firebase } from "../../js/firebase"
import "../../css/profile.css"

const Profile = () => {
    const [profile, setProfile] = useQueryParam("profile", StringParam);

    // Check if there is a query for a profile, if so it will show that profile, if not it will show your own.
    if (profile !== undefined) {
        // Get the profile
        db.collection('users').doc(profile).get()
        .then(function (result) {
            // if they are a worker, display their profile with their data.
            if (result.data().isWorker !== undefined) {
                DisplayProfile(result);
                addToFavorites(result);
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

    // Check if user is a parent or worker, and display relevant information.
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
        $("#favoritesDiv").html("<div class='favorites-body'></div>");

        firebase.auth().onAuthStateChanged(function (user) {
            if (user && profile == null) { // When viewing your own profile, display YOUR favorites
                db.collection("users").doc(user.uid).collection("favorites").get().then(function (snap) {
                    snap.forEach(function(favorite) {
                        viewFavorites(favorite);
                    })
                })
            } else if (user && profile != null) { // When viewing someone else's profile, display THEIR favorites
                db.collection("users").doc(profile).collection("favorites").get().then(function (snap) {
                    snap.forEach(function(favorite) {
                        viewFavorites(favorite);
                    })
                })
            }
        })
    }
    
    // Get user data from firestore database
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
    
    // Load previously added children from database.
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

    // Load the activities the worker has orginized.
    function LoadWorkerActivities() {
        let workerEmail;
        let intervel = null;
        
        // Because of the delay in loading elements, I had to run this in an intervel to make sure that they actually displayed.
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

    // Create an activity on screen
    function CreateCreatedActivity(title, time, key, worker) {
        let id = key + "-profile-activity";
        let buttonID = "profile-signup-" + key;
        $('#profile-created-activities').append("<div id='" + id + "'></div>");
        $("#" + id).append("<p>" + title + " - " + time + "</p>");
        $("#" + id).append("<div class='box'><input type='button' id='" + buttonID + 
            "' class='btn btn-white btn-animation-1 middled-button inactive' value='Sign Up!'/>");

        // Add the event listener to the sign up button
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
        // Actually add the signup listener but only if the person viewing the profile is a parent.
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

    // Handle the children form
    const handleForm = e => {
        e.preventDefault();
        let children = $("input[class='childname']");
        // If the user is signed in
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // Add all of the children to the users children field if they don't already exist.
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

    // Adds child to profile card
    function AddChild(name) {
        $('#child-form').prepend(" <input type='text' class='childname' placeholder='Child' value='" + name + "'></input> ");
    }

    // Add favorite worker information as well as view profile link
    function viewFavorites(favorite) {
        $("<h4 class='favorites-title'>" + favorite.data().firstName + "</h4>").appendTo(".favorites-body");
        $("<p class='favorites-text'> Email: " + favorite.data().email + "</p>").appendTo(".favorites-body");
        $("<p class='favorites-text'> Phone: " + favorite.data().phoneNumber + "</p>").appendTo(".favorites-body");
        $("<input type='button' class='btn btn-white btn-animation-1 middled-button' value='View Profile'></input>").appendTo(".favorites-body");
        $("<hr>").appendTo(".favorites-body");

        // Redirect to worker's profile when you click the "View profile" button
        $("input").click(function() {
            window.location.href= "/profile/?profile=" + favorite.data().userKey;
        })
    }

    // Add this worker to your personal favorites list
    function addToFavorites(worker) {

        // Adds userKey, which is the worker's ID used to link to the worker's profile
        let workerObject = {
            displayName: worker.data().displayName,
            email: worker.data().email,
            firstName: worker.data().firstName,
            isWorker: worker.data().isWorker,
            lastName: worker.data().lastName,
            phoneNumber: worker.data().phoneNumber,
            photoURL: worker.data().photoURL,
            userKey: profile
        }

        // Add to favorites collection
        $('#favorite-worker').click(function () {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user !== null) {
                    alert('Added ' + workerObject.firstName + ' to favorites! Go to your profile to see your favorite workers.');
                    db.collection("users").doc(user.uid).collection("favorites").add(workerObject);
                }
            })
        });
    }

    // HTML for profile card
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
                <div className="box">
                    <p>Favorite workers</p>
                    <div id="favoritesDiv">
                    </div>
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