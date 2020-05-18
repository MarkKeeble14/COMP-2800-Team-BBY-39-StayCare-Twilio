import React from 'react'
import "./css/featured_activities.css"
import "./css/temp.css"
import "./js/carousel_controller.js"
import $ from "jquery"
import {db} from "./js/firebase"
import {ref} from "./js/firebase"
import {firebase} from "./js/firebase"

const FeaturedActivities = () => {
    let activityDocs = []; 

    function getActivities() {   
        db.collection("activities").get()
        .then(function (snap) {      
            snap.forEach(function (doc) {
                activityDocs.push(doc);
            });
        }).then(function () {  
            showFeaturedActivities();      
        })
    }

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


    function showFeaturedActivities() {
        for (let i = 0; i < 5; i++) {
            let id = "#featured" + (i + 1);
            let data = activityDocs[i].data();
            let path = data.image;
            let thisDate = getWrittenDate(data.time);
            let sched = "Scheduled for: " + thisDate.time + " on " + thisDate.date; 
            let size = "Room Size: " + data.size + " spots";
            let key = data.key;
            ref.child(path).getDownloadURL().then(function(url) {
                // console.log("image found at path: " + path);
                $(id + " img").attr("src", url);
                $(id + " .activityInfo .title").text(data.title + " with " + data.worker);
                $(id + " .activityInfo .description").text(data.description);
                $(id + " .activityInfo .schedule").text(sched);
                $(id + " .activityInfo .roomSize").text(size);

                $(id + " .activityInfo .keyValue").text(key);
                $(id + " .activityInfo .keyValue").addClass('inactive');
            }).catch(function(error) {
                console.log("error getting download url");
            });
        }
    }
    
    getActivities();

    async function AddToActivities() {
        let activeItem = $('.active')[0];
        let slide = activeItem.id.substring(activeItem.id.length - 1, activeItem.id.length);
        let key = $('#keyValue' + slide).html();

        console.log($('#keyValue' + slide).html());
        console.log('signing up for an activity');
        const snapshot = await firebase.firestore().collection('activities').get();
        console.log(snapshot.docs);
        for (let i = 0; i < snapshot.docs.length; i++) {
            if (snapshot.docs[i].data().key == key) {
                firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    alert("You've signed up for " + snapshot.docs[i].data().title + '!');
                    db.collection("users").doc(user.uid)
                    .update({
                        myActivities: firebase.firestore.FieldValue.arrayUnion(snapshot.docs[i].data()) //Add the result object to "my activities" database
                    });
                } else {
                    alert('please login or signup for an account');
                }
                })
            }
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