import React from "react"
import { db } from "./js/firebase"
import { ref } from "./js/firebase"
import { firebase } from "./js/firebase"
import "./css/signed-up-for.css"
import { useQueryParam, StringParam } from "use-query-params";
import $ from "jquery"

let generated;
const SignedUpFor = () => {
    generated = false;
    const [room, setRoom] = useQueryParam("room", StringParam);
    let testworkers = { 0: 'Charlie', 1: 'Maddie', 2: 'Todd', 3: 'Philis' , 4: 'Chad', 5: 'Tanner' };
    let activities = [];

    function GetActivities() {
        console.log(generated);
        if (generated) {
            return;
        }
        firebase.auth().onAuthStateChanged(function (user) {
            if (user != null) {
                db.collection("users").doc(user.uid).get()
                .then(function (snap) {
                    snap.data().myActivities.forEach(function (myActivity) {
                        var contains = false;
                        var i;
                        for (i = 0; i < activities.length; i++) {
                            if (activities[i] == myActivity) {
                                contains = true;
                                break;
                            }
                        }
                        if (!contains) {
                            activities.push(myActivity);
                        }
                    })
                }).then(function (result) {
                    ShowMyActivities();
                })
            }
        })
        generated = true;
    }

    function ShowMyActivities() {
        for (let i = 0; i < (Object.keys(activities).length); i++) {
            let id = "activity" + i;
            let name = activities[i].title;
            // key should be the document name
            let key = Math.random().toString(36).substr(2, 9);

            // temp
            let p = Math.floor(Math.random() * 5);
            let worker = testworkers[p];

            let time = activities[i].time;

            CreateActivity(id, name, key, worker, time);
        }
    }

    function CreateActivity(id, name, key, worker, time) {
        $('#signed-up-for').append(
            $( "<div class='activity' id='" + id + "'></div>" )
        );
        $('#' + id).append(
            $( "<div class='info' id='" + id + "-info-div'></div>")
        );
        $('#' + id + "-info-div").append($('<p>' + name + '</p>'));
        $('#' + id + "-info-div").append($('<p>' + key + '</p>'));
        $('#' + id + "-info-div").append($('<p>' + worker + '</p>'));
        $('#' + id + "-info-div").append($('<p>' + time + '</p>'));
        $('#' + id).append(
            $("<input type='button' value='enter' id='" + id + "-enter'/>")
        );
        $('#' + id + "-enter").on('click', function() {
            EnterRoom(key);
        })
    }

    GetActivities();

    function EnterRoom(name) {
        generated = true;
        setRoom(name);
        $('#join').text('Join: ' + name);
    }

    return (
        <div id="signed-up-for">
        </div>
    )
}
export default SignedUpFor
export { generated }