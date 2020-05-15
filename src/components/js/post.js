import $ from "jquery"
import { db } from "../js/firebase"
import { ref } from "../js/firebase"
import {search} from "./search"
import {results} from "./search"
import {getSearchResults} from "./search"
import {autocomplete} from "./search"
import {showSearchResults} from "./search"
import {showActivity} from "./search"
import {getWrittenDate} from "./search"
import {clearSearchResults} from "./search"
import {clearInput} from "./search"
import {toggleNav} from "./search"
import {fileRef} from "../file-select"
import {file} from "../file-select"
import {fullPath} from "../file-select"

let photo = $("#image-container");

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
    })
}

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

    const MESSAGE = {
        IMAGE: "Please add an image.", 
        TITLE: "Title for activity required.",
        DESC: "Please add description for activity.",
        SIZE: "Please select an option.",
        TIME: "Please schedule a time for this activity."
    }

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
    console.log(shouldipost);
    if (shouldipost) {
        db.collection("activities").doc(postId).set({
            "title": activityName,
            "description": desc,
            "image": fullPath,
            "time": time,
            "size": maxOccupants
        }).then(function () {
            if (file) {
                uploadImage(file, fileRef);        
            }
            refreshSearchResults();
            $("#post-form").hide();
            $("#featuredActivities").show();
        });        
    } else {
        console.log("error. did not upload");
    }


}

// resets search results
function refreshSearchResults() {
    clearSearchResults();
    getSearchResults(["activities"]);
    autocomplete(document.getElementById("myInput"), search);
}

/*
document.getElementById("worker-link").onclick = function () {
    clearForm();
    hideElement("featuredActivities");
    hideElement("post-form");
    showElement("worker-registration-form");
}*/

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
