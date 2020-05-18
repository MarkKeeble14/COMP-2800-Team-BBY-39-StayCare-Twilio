import React from "react"
import { db } from "./js/firebase"
import { firebase } from "./js/firebase"
import "./css/signed-up-for.css"
import { useQueryParam, StringParam } from "use-query-params";
import $ from "jquery"

let activities = [];
let createdActivities = [];

const SignedUpFor = () => {
    const [room, setRoom] = useQueryParam("room", StringParam);

    function GetActivities() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user != null) {
                db.collection("users").doc(user.uid).get()
                .then(function (snap) {
                    try {
                        snap.data().myActivities.forEach(function (myActivity) {
                            let index = 0, contains = false;
                            for (index = 0; index < activities.length; index++) {
                                if (activities[index] == myActivity) {
                                    contains = true;
                                    break;
                                }
                            }
                            if (!contains) {
                                activities.push(myActivity);
                            }
                        })
                        $('#no-activities-scheduled').addClass('inactive');
                    } catch {
                        $('#no-activities-scheduled').removeClass('inactive');
                    }
                }).then(function (result) {
                    ShowMyActivities();
                })
            }
        })
    }

    function ShowMyActivities() {
        for (let i = 0; i < activities.length; i++) {
            let id = "activity" + i;
            let name = activities[i].title;
            let key = activities[i].key;
            let worker = activities[i].worker;
            let time = activities[i].time;

            // Ensure duplicates are NOT created
            let index = 0, contains = false;
            for (index = 0; index < createdActivities.length; index++) {
                if (createdActivities[index] == key) {
                    contains = true;
                    break;
                }
            }
            if (!contains) {
                CreateActivity(id, name, key, worker, time);
                createdActivities.push(key);
            }
        }
    }

    function CreateActivity(id, name, key, worker, time) {
        $('#signed-up-for').append(
            $( "<div class='activity' id='" + id + "'></div>" )
        );
        $('#' + id).append(
            $( "<div class='info' id='" + id + "-info-div'></div>")
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

    GetActivities();

    function LeaveEvent(key) {
        let activity;
        firebase.auth().onAuthStateChanged(function(user) {
            // User is signed in.
            db.collection('users').doc(user.uid).get()
            .then(function(userRef) {
            // Find the activity to remove
            userRef.data().myActivities.forEach(function (myActivity) {
                if (myActivity.key == key) {
                    activity = myActivity;
                }
            });
            }).then(function() {
                console.log(activity);
                alert('removing ' + activity.title + ' from your scheduled activities');
                // Remove the activity from myActivities
                db.collection('users').doc(user.uid)
                .update({
                    "myActivities": firebase.firestore.FieldValue.arrayRemove(activity)
                });
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
export default SignedUpFor