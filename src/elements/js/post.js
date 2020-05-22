import $ from "jquery"
import { db } from "../js/firebase"
import { search } from "./search"
import { firebase } from "./firebase"
import { getSearchResults } from "./search"
import { autocomplete } from "./search"

import { clearSearchResults } from "./search"
import { fileRef } from "../components/used-across-pages-components/file-select"
import { file } from "../components/used-across-pages-components/file-select"
import { fullPath } from "../components/used-across-pages-components/file-select"

let photo = null;
if (typeof window !== "undefined" && typeof window.document !== "undefined") {
    // browser
    let photo = $("#image-container");
}

//random id for activity
let newPostId = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9) + "/";
};
let postId = newPostId();

function uploadImage(file, ref) {
    ref.put(file).then(function() {
        console.log("uploaded file");
        window.location.replace("../room");
    })
}

let worker;
firebase.auth().onAuthStateChanged((user) => {
    db.collection("users").doc(user.uid).get()
    .then(function (doc) {
        worker = doc.data().firstName;
        if (doc.data().lastName !== undefined) {
            worker += " " + doc.data().lastName;
        }
    })
})
/**
 * For clicking post button at bottom of form.
 */
function postActivity() { 
    let activityName = $("#activityName").val();
    let desc = $("#description").val();
    let time = $("#datetimepicker").val();
    let sel = $("#maxOccupants")[0];
    let opt = sel.options[sel.selectedIndex]; 
    let maxOccupants = parseInt(opt.text);


    // messages to display when a field isn't filled out properly
    const MESSAGE = {
        IMAGE: "Please add an image.", 
        TITLE: "Title for activity required.",
        DESC: "Please add description for activity.",
        SIZE: "Please select an option.",
        TIME: "Please schedule a time for this activity."
    }


    /*Each field is checked to see if it is filled out.
    If one of them is not filled out, an error will be inserted after the field where the
    error is with the corresponding error message. If they are all filled out correctly, the
    errors are removed and boolean shouldipost remains true.*/

    let shouldipost = true;

    if (!file) {
        $("#imageError").remove();
        $("<p id='imageError'>" +   MESSAGE.IMAGE + "</p>").insertAfter("#image-container");
        $("#imageError").css("text-align", "center");
        $("#imageError").css("color", "red");
        $("#imageError").css("font-size", "80%");

        shouldipost = false;
    } else {
        $("#imageError").remove();
    }

    if (!activityName || activityName === "") {
        $("#titleError").remove();
        $("<p id='titleError'>" + MESSAGE.TITLE + "</p>").insertAfter("#activityName");
        $("#titleError").css("color", "red");
        $("#titleError").css("font-size", "80%");

        shouldipost = false;
    } else {
        $("#titleError").remove();
    }

    if (!desc || desc === "") {
        $("#descError").remove();
        $("<p id='descError'>" + MESSAGE.DESC + "</p>").insertAfter("#description");
        $("#descError").css("color", "red");
        $("#descError").css("font-size", "80%");

        shouldipost = false;
    } else {
        $("#descError").remove();
    }

    if (!time || time === "") {
        $("#timeError").remove();
        $("<p id='timeError'>" + MESSAGE.TIME + "</p>").insertAfter("#datetimepicker");
        $("#timeError").css("color", "red");
        $("#timeError").css("font-size", "80%");

        shouldipost = false;
    } else {
        $("#timeError").remove();
    }

    if (parseInt(sel.selectedIndex) < 1) {
        $("#sizeError").remove();
        $("<p id='sizeError'>" + MESSAGE.SIZE + "</p>").insertAfter("#maxOccupants");
        $("#sizeError").css("color", "red");
        $("#sizeError").css("font-size", "80%");
        
        shouldipost = false;
    } else {
        $("#sizeError").remove();
    }

    /*Posts activity to database, uploads the image to firebase storage, then
    replaces the window */
    console.log(worker);
    let key = Math.random().toString(36).substr(2, 9);
    function postToDatabase() {
        db.collection("activities").doc(postId).set({
            "key": key,
            "title": activityName,
            "description": desc,
            "image": fullPath,
            "time": time,
            "size": maxOccupants,
            "worker": worker
        }).then(function () {
            if (file) {
                uploadImage(file, fileRef);
                console.log("uploaded");        
            }
            AddToActivities(key);
            alert("Adding this activity to your activities. Please don't exit the window! It will refresh when it's done!");
            refreshSearchResults();
        })
    }

    if (shouldipost) {
        postToDatabase();
    } else {
        console.log("error. did not upload");
    }
}

function AddToActivities(key) {
    db.collection("activities").get()
    .then(function (snap) {      
        snap.forEach(function (doc) {
            if (doc.data().key === key) {
                // Assign this activity to a variable.
                let activity = doc.data();
                firebase.auth().onAuthStateChanged(function (user) {
                    // if the user is signed in
                    if (user) {
                        if (activity.occupants !== undefined) {
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
                        }
                        db.collection('activities').doc(doc.id)
                        .update({
                            occupants: firebase.firestore.FieldValue.arrayUnion(user.email)
                        })

                        let childrenAdded = [];
                        let contactsAdded = [];

                        // Update the myActivities field with the information gathered.
                        db.collection("users").doc(user.uid)
                        .update({
                            myActivities: firebase.firestore.FieldValue.arrayUnion({
                                mainActivity: activity,
                                contactInfo: contactsAdded,
                                childrenInfo: childrenAdded
                            }) //Add the result object to "my activities" database
                        });
                    }
                })
            }
        })
    })
}


// resets search results
function refreshSearchResults() {
    clearSearchResults();
    getSearchResults(["activities"]);
    autocomplete($("#myInput"), search);
}

// reset fields in form
function clearForm() {
    photo.css("background-image", "url('images/img_placeholder.png')");
    $("#activityName").val("");
    $("#description").val("");
    postId = newPostId();
}

export {photo}
export {fileRef}
export {file}
export {fullPath}
export {newPostId}
export {postId}
export {uploadImage}
export {postActivity}
export {refreshSearchResults}
export {clearForm}
