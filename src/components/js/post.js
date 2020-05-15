import $ from "jquery"

import { db } from "../js/firebase"
import { ref } from "../js/firebase"

import { clearSearchResults } from "./search"
import { getSearchResults } from "./search"
import { autocomplete } from "./search"
import { search } from "./search"

let photo = document.getElementById("image-container");
let fileRef;
let file;
let fullPath;

//random id for activity
let newPostId = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9) + "/";
};
let postId = newPostId();

function uploadImage(file) {
    fileRef.put(file).then(function() {
        console.log("uploaded file");
    })
}

/**
 * For adding image to activity in post form, input type of filetoRead is file.
 */
document.getElementById("filetoRead").addEventListener("change",function(){
    console.log('event logged');
    file = this.files[0];
    //if a file was chosen   
    if (file) {
        //if the file chosen is an image
        if ((file.type === 'image/png') || (file.type === 'image/jpg') || (file.type === 'image/jpeg')) {       
            fullPath = "Images/activities/" + postId + file.name;
            fileRef = ref.child(fullPath);

            let reader = new FileReader();
            // show the image in the form
            reader.onload = function (e) {
                photo.style.backgroundImage = "url('" + e.target.result + "')";
            };
            reader.onerror = function (e) {
                console.error("An error ocurred reading the file", e);
            };        
            reader.readAsDataURL(file);            
        } else {
            alert("Please provide a png or jpg image.");
            return false;
        }
    }
}, false);


/**
 * For clicking post button at bottom of form.
 */
document.getElementById("post").onclick = function () {
    let activityName = document.getElementById("activityName").value;
    let desc = document.getElementById("description").value;
    let time = document.getElementById("datetimepicker").value;
    let sel = document.getElementById("maxOccupants");
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
        $("<p id='timeError'>" + MESSAGE.TIME + "</p>").insertBefore("#maxOccupants");
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

    if (shouldipost) {
        db.collection("activities").doc(postId).set({
            "title": activityName,
            "description": desc,
            "image": fullPath,
            "time": time,
            "size": maxOccupants
        }).then(function () {
            if (file) {
                uploadImage(file);        
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

// form is cleared when clicking on the post link button, 
document.getElementById("post-link").onclick = function () {
    clearForm();
    $("#featuredActivities").hide();
    $("#searchResultsActivities").hide();
    $("#post-form").show();
}

document.getElementById("worker-link").onclick = function () {
    clearForm();
    $("#featuredActivities").hide();
    $("#searchResultsActivities").hide();
    $("worker-registration-form").show();
}

function clearForm() {
    photo.style.backgroundImage = "url('images/img_placeholder.png')";
    document.getElementById("activityName").value = "";
    document.getElementById("description").value = "";
    postId = newPostId();
}