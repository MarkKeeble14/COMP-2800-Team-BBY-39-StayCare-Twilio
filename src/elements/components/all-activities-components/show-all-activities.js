import React from 'react'
import { db } from "../../js/firebase"
import { ref } from "../../js/firebase"
import { firebase } from "../../js/firebase"
import { useQueryParam, StringParam } from "use-query-params";
import $ from "jquery"
import "../../css/show-all-activities.css"

// The main component inside of the all-activities page. Will load all the activities from the database and display them on screen.
const ShowAllActivities = () => {
    const [activity, setActivity] = useQueryParam("activity", StringParam);

    let activities = [];
    // Gets all activities from the database and pushes them into the activities array.
    function GetActivities() {
        db.collection('activities').get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          activities.push(doc.data());
        });
      }).then(function () {
            ShowActivities();
      });
    }
    GetActivities();

    // Creates elements on screen for each of the activities in the activities array.
    function ShowActivities() {
        for (let i = 0; i < activities.length; i++) {
            let resultId = "#" + activities[i].key;
            $("<div class='card flex-halved' id='" + activities[i].key + "'></div>").appendTo("#all-activities-container");

            ref.child(activities[i].image).getDownloadURL().then(function (url) {
                $("<img class='card-img-top' src='" + url + "'></img>").prependTo(resultId);
            })
            $("<div class='card-body'></div>").appendTo(resultId);

            $("<h4 class='card-title left'>" + activities[i].title + "</h4>").appendTo(resultId + " .card-body");
            $("<p class='card-worker left'> with " + activities[i].worker + "</p>").appendTo(resultId + " .card-body");
            $("<p class='card-text left'>" + activities[i].description + "</p>").appendTo(resultId + " .card-body");

            let scheduledTime = activities[i].time;
            let timeHtml = "<p class='card-text left'>Scheduled for: " + scheduledTime + "</p>";
            $(timeHtml).appendTo(resultId + " .card-body");

            $("<p class='card-text left'>Room Size: " + activities[i].size + " spots</p>").appendTo(resultId + " .card-body");
            $("<div class='box'><input type='submit' id='signUpButton" + i + "' class='btn btn-white btn-animation-1 middled-button' value='Sign Up!'/></div>").appendTo(resultId + " .card-body");
                
            // Event listener for the signup button
            $('#signUpButton' + i).on('click', function() {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user != null) {
                        db.collection("users").doc(user.uid).get()
                        .then(function (snap) {
                            $('.children-response-container').replaceWith("<div class='children-response-container'></div>");
                            // if the user has children
                            if (snap.data().children !== undefined) {
                                for (let i = 0; i < snap.data().children.length; i++) {
                                    let child = snap.data().children[i];
                                    let id = child + '-Check';
                                    $('.children-response-container').append("<input type='checkbox' class='child-select' id='" + id + 
                                    "' name='" + id + "' value='" + child + "'/>" +
                                    "<label for='" + id + "'>" + child + "</label>");
                                }

                                // toggle the visibility on the signup form
                                let signupForm = $('#signupForm');
                                if (signupForm.hasClass('active')) {
                                    signupForm.removeClass('active');
                                } else {
                                    signupForm.addClass('active');
                                }
                                
                                // set the elements within the signup form to the correct values
                                $('#signup-form-activity-title').html(activities[i].title);
                                $('#signup-form-activity-key').html(activities[i].key);
                                $('#signup-form-activity-worker').html(activities[i].worker);
                                $('#signup-form-activity-time').html(activities[i].time);
                            } else {
                                alert("You don't currently have any children attached to your account.");
                            }
                        })
                    }
                })
            })
        }
    }

    return (
        <div id='show-all-activities'>
            <h1 id='title'>Showing All Activities</h1>
            <div id='all-activities-container'>
            </div>
        </div>
    )
}

export default ShowAllActivities