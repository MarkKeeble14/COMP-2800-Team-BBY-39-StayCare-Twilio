import React from "react"
import { db } from "./js/firebase"
import { firebase } from "./js/firebase"
import "./css/my-activities.css"
import { useQueryParam, StringParam } from "use-query-params";
import $ from "jquery"

let activities = [];
let name;

// 
const MyActivities = () => {
    const [room, setRoom] = useQueryParam("room", StringParam);
    
    // Clears the current myActivities elements, and then gets the myActivities field in the current users document 
    // and adds them to the activities array.
    // Once done, it then calls method ShowActivities();
    function GetActivities() {
        const clear = (new Promise(ClearMyActivities))  
        .then(
            firebase.auth().onAuthStateChanged(function (user) {
                console.log(user.uid);
                if (user != null) {
                    // if there is a user, access the current users document
                    db.collection("users").doc(user.uid).get()
                    .then(function (snap) {
                        // if the current user doesn't have a myActivities field or they are not currently signed up for 
                        // any activities, display the message saying that they don't have any activities.
                        if (snap.data().myActivities === undefined || snap.data().myActivities.length === 0) {
                            $('#no-activities-scheduled').removeClass('inactive');
                        } else {
                            $('#no-activities-scheduled').addClass('inactive');
                            if (activities.length === 0) {
                                for (let i = 0; i < snap.data().myActivities.length; i++) {
                                    if (snap.data().myActivities[i].mainActivity !== undefined) {
                                        let id = "activity" + i;
                                        let name = snap.data().myActivities[i].mainActivity.title;
                                        let key = snap.data().myActivities[i].mainActivity.key;
                                        let worker = snap.data().myActivities[i].mainActivity.worker;
                                        let time = snap.data().myActivities[i].mainActivity.time;
                                        let createdActivity = [id, name, key, worker, time];
                                        activities.push(createdActivity);
                                    }
                                } 
                            }
                            ShowActivities();
                        }
                    })
                }       
            })
        )
    }
    GetActivities();

    // Calls CreateActivity() on every activity in the activities array.
    function ShowActivities() {
        for (let i = 0; i < activities.length; i++) {
            let id = "activity" + i;
            let name = activities[i][1];
            let key = activities[i][2];
            let worker = activities[i][3];
            let time = activities[i][4];
            CreateActivity(id, name, key, worker, time);
        }
    }

    // Creates a visual element to display an activity.
    function CreateActivity(id, name, key, worker, time) {
        $('#signed-up-for').append(
            $( "<div class='activity' id='" + id + "'></div>" )
        );
        $("#" + id).css("background", "#EEFFFF");
        $("#" + id).css("margin", "10px");
        $('#' + id).append(
            $( "<div id='" + id + "-info-div'></div>")
        );
        $('#' + id + "-info-div").append($('<p>' + name + ' with ' + worker + '</p>'));
        $('#' + id + "-info-div").append($('<p>At ' + time + '</p>'));
        $('#' + id).append(
            $("<input type='button' value='Join Room' id='" + id + "-enter' class='btn btn-white btn-animation-1 right-button'/>")
        );
        $('#' + id).append(
            $("<input type='button' value='Leave " + name + "' id='" + id + "-leave' class='btn btn-white btn-animation-1 left-button'/>")
        );
        $('#' + id + "-enter").on('click', function() {
            EnterRoom(key);
        });
        $('#' + id + "-leave").on('click', function() {
            LeaveEvent(key);
        });
    }

    // Leaves the event
    function LeaveEvent(key) {
        let activity;
        firebase.auth().onAuthStateChanged(function(user) {
            // User is signed in.
            db.collection('users').doc(user.uid).get()
            .then(function(userRef) {
            // Find the activity to remove
            userRef.data().myActivities.forEach(function (myActivity) {
                if (myActivity.mainActivity.key === key) {
                    activity = myActivity;
                }
            });
            }).then(function() {
                console.log(activity);
                alert('Removing ' + activity.mainActivity.title + ' from your scheduled activities');
                // Remove the activity from myActivities
                db.collection('users').doc(user.uid)
                .update({
                    "myActivities": firebase.firestore.FieldValue.arrayRemove(activity)
                });
                db.collection("activities").get()
                .then(function (snap) {      
                    snap.forEach(function (doc) {
                        console.log(doc.data());
                        if (doc.data().key === key) {
                            db.collection('activities').doc(doc.id)
                            .update({
                                occupants: firebase.firestore.FieldValue.arrayRemove(user.email)
                            })
                        }
                    });
                })
            })
            .catch(function(error) {
                console.log(error); 
            });
        });
    }

    function EnterRoom(name) {
        setRoom(name);
        $('#join').text('Join: ' + name);
    }

    function ClearMyActivities() {
        $('#signed-up-for').replaceWith("<div id='signed-up-for' class='active'></div>");
    }

    return (
        <div>
            <div id="signed-up-for" className="active">
            </div>
            <div id="no-activities-scheduled" className="inactive">
                <p>You currently have no events scheduled</p>
            </div>
        </div>
        
    )
}

export default MyActivities
export {name}