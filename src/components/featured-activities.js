import React from 'react'
import $ from "jquery"
import {db} from "./js/firebase"
import {ref} from "./js/firebase"
import {firebase} from "./js/firebase"

import "./css/featured-activities.css"
import "./css/temp.css"

// This component contains the carousel featured on the landing page that contains the featured activities.
// For this, we used a basic bootstrap carousel and altered it to fit our needs - https://getbootstrap.com/docs/4.0/components/carousel/
const FeaturedActivities = () => {
    let activityDocs = []; 

    // Read all activities from the database, order them within the array in order of most populated.
    // Population is determined by doing: current occupants / max occupants
    function getActivities() {   
        db.collection("activities").get()
        .then(function (snap) {      
            snap.forEach(function (doc) {
                if (doc.data().occupants !== undefined && doc.data().occupants.length < doc.data().size) {
                    activityDocs.push(doc);
                    for (let i = 1; i < activityDocs.length; i++) {
                        let lastRating = activityDocs[i - 1].data().occupants.length / activityDocs[i - 1].data().size;
                        let thisRating = activityDocs[i].data().occupants.length / activityDocs[i].data().size;
    
                        // This is comparing the population of each activity and will swap them if the one in the 
                        // i - 1 position has a lower population than the one in the i position.
                        if (lastRating < thisRating) {
                            let tmp = activityDocs[i - 1];
                            activityDocs[i - 1] = activityDocs[i];
                            activityDocs[i] = tmp;
                        }
                    }
                }
            });
        }).then(function () {  
            showFeaturedActivities();      
        })
    }

    // Shows the top 5 activities within the carousel.
    function showFeaturedActivities() {
        for (let i = 0; i < 5; i++) {
            let id = "#featured" + (i + 1);
            let data = activityDocs[i].data();
            let path = data.image;
            let thisDate = getWrittenDate(data.time);
            let sched = "Scheduled for: " + thisDate.time + " on " + thisDate.date; 
            let size = data.occupants.length;
            let maxSize = data.size;
            let key = data.key;
            ref.child(path).getDownloadURL().then(function(url) {
                // console.log("image found at path: " + path);
                $(id + " img").attr("src", url);
                $(id + " .activityInfo .title").text(data.title + " with " + data.worker);
                $(id + " .activityInfo .description").text(data.description);
                $(id + " .activityInfo .schedule").text(sched);
                $(id + " .activityInfo .roomSize").text(size + " out of " + maxSize + " seats are currently taken.");
                $(id + " .activityInfo .keyValue").text(key);
                $(id + " .activityInfo .keyValue").addClass('inactive');
            }).catch(function(error) {
                console.log("error getting download url");
            });
        }
    }
    getActivities();

    // This is the function attached to the button on each slide. It checks which slide is currently active, then searches through 
    // the activities to find the one that matches the key. It then adds that activity to the current users myActivities field.
    async function AddToActivities() {
        let signupForm = $('#signupForm');
        if (signupForm.hasClass('active')) {
            signupForm.removeClass('active');
            return;
        }

        let activeItem = $('.active')[0];
        let slide = activeItem.id.substring(activeItem.id.length - 1, activeItem.id.length);
        let key = $('#keyValue' + slide).html();

        const snapshot = await firebase.firestore().collection('activities').get();
        for (let i = 0; i < snapshot.docs.length; i++) {
            if (snapshot.docs[i].data().key == key) {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user != null) {
                        db.collection("users").doc(user.uid).get()
                        .then(function (snap) {
                            if (snap.data().children != undefined) {
                                $('.children-response-container').replaceWith("<div class='children-response-container'></div>");
                                for (let i = 0; i < snap.data().children.length; i++) {
                                    let child = snap.data().children[i];
                                    let id = child + '-Check';
                                    $('.children-response-container').append("<input type='checkbox' class='child-select' id='" + id + 
                                        "' name='" + id + "' value='" + child + "'/>" +
                                        "<label for='" + id + "'>" + child + "</label>");
                                }
                
                                signupForm.addClass('active');
                                $('#signup-form-activity-title').html(snapshot.docs[i].data().title);
                                $('#signup-form-activity-key').html(snapshot.docs[i].data().key);
                                $('#signup-form-activity-worker').html(snapshot.docs[i].data().worker);
                                $('#signup-form-activity-time').html(snapshot.docs[i].data().time);
                            } else {
                                alert("You don't currently have any children attached to your account.");
                            }
                        })
                    }
                  })
            }
        }
    }

    // Converts a date to a string.
    function getWrittenDate(dateString) {
        let hour = parseInt(dateString.substr(0, 2));
        let ampm = "AM";
        if (hour > 12) {
          hour -= 12;
          ampm = "PM";
        }
        
        let minutes = dateString.substr(3, 3);
        let time = hour + ":" + minutes + " " + ampm;
      
        let monthNum = parseInt(dateString.substr(6, 7));
        const MONTHS = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
      
        let monthName = MONTHS[monthNum - 1];
        let day = parseInt(dateString.substr(9, 10));
        let year = parseInt(dateString.substr(12, 15));
        let date = monthName + " " + day + ", " + year;
      
        return {
          date: date,
          time: time
        }
    }

    return (
        <div id="featuredActivities">
            <h1 id="title">Featured Activities</h1>
            <div id="carouselContainer">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div id="featured1" className="carousel-item active">
                            <img className="d-block" src="images/img_placeholder.png" alt="First slide"/>
                            <div className="activityInfo">
                                <h3 className="title"></h3>
                                <p className="description"></p>
                                <p className="schedule"></p>
                                <p className="roomSize"></p>
                                <p className="keyValue" id="keyValue1"></p>
                            </div>
                            <div className="box">
                                <input type="button" className="btn btn-white btn-animation-1 middled-button" value='Add To Activities' onClick={AddToActivities}/>
                            </div>
                        </div>
                        <div id="featured2" className="carousel-item">
                            <img className="d-block" src="images/img_placeholder.png" alt="Second slide"/>
                            <div className="activityInfo">
                                <h3 className="title"></h3>
                                <p className="description"></p>
                                <p className="schedule"></p>
                                <p className="roomSize"></p>
                                <p className="keyValue" id="keyValue2"></p>
                            </div>
                            <div className="box">
                                <input type="button" className="btn btn-white btn-animation-1 middled-button" value='Add To Activities' onClick={AddToActivities}/>
                            </div>
                        </div>
                        <div id="featured3" className="carousel-item">
                            <img className="d-block" src="images/img_placeholder.png" alt="Third slide"/>
                            <div className="activityInfo">
                                <h3 className="title"></h3>
                                <p className="description"></p>
                                <p className="schedule"></p>
                                <p className="roomSize"></p>
                                <p className="keyValue" id="keyValue3"></p>
                            </div>
                            <div className="box">
                                <input type="button" className="btn btn-white btn-animation-1 middled-button" value='Add To Activities' onClick={AddToActivities}/>
                            </div>
                        </div>
                        <div id="featured4" className="carousel-item">
                            <img className="d-block" src="images/img_placeholder.png" alt="Fourth slide"/>
                            <div className="activityInfo">
                                <h3 className="title"></h3>
                                <p className="description"></p>
                                <p className="schedule"></p>
                                <p className="roomSize"></p>
                                <p className="keyValue" id="keyValue4"></p>
                            </div>
                            <div className="box">
                                <input type="button" className="btn btn-white btn-animation-1 middled-button" value='Add To Activities' onClick={AddToActivities}/>
                            </div>
                        </div>
                        <div id="featured5" className="carousel-item">
                            <img className="d-block" src="images/img_placeholder.png" alt="Fifth slide"/>
                            <div className="activityInfo">
                                <h3 className="title"></h3>
                                <p className="description"></p>
                                <p className="schedule"></p>
                                <p className="roomSize"></p>
                                <p className="keyValue" id="keyValue5"></p>
                            </div>
                            <div className="box">
                                <input type="button" className="btn btn-white btn-animation-1 middled-button" value='Add To Activities' onClick={AddToActivities}/>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev previous" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

            </div>
            
        </div>
    )
}

export default FeaturedActivities;