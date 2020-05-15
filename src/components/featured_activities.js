import React from 'react'
import "./css/featured_activities.css"
import "./js/carousel_controller.js"
import * as $ from 'jquery';
import { db } from "./js/firebase"
import { ref } from "./js/firebase"


const FeaturedActivities = () => {
    let activityDocs = []; 

    function getActivities() {   
        db.collection("activities").get()
        .then(function (snap) {      
            console.log('accessed');
            snap.forEach(function (doc) {
                // console.log(doc);
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
            ref.child(path).getDownloadURL().then(function(url) {
                // console.log("image found at path: " + path);
                $(id + " img").attr("src", url);
                $(id + " .activityInfo .title").text(data.title);
                $(id + " .activityInfo .description").text(data.description);
                $(id + " .activityInfo .schedule").text(sched);
                $(id + " .activityInfo .roomSize").text(size);
            }).catch(function(error) {
                console.log("error getting download url");
            });
        }
    }
    
    getActivities();

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
                                <h4 className="leaderName"></h4>
                                <p className="description"></p>
                                <h6 className="schedule"></h6>
                                <h6 className="roomSize"></h6>
                            </div>
                        </div>
                        <div id="featured2" className="carousel-item">
                            <img className="d-block" src="images/img_placeholder.png" alt="Second slide"/>
                            <div className="activityInfo">
                                <h3 className="title"></h3>
                                <h4 className="leaderName"></h4>
                                <p className="description"></p>
                                <h6 className="schedule"></h6>
                                <h6 className="roomSize"></h6>
                            </div>
                        </div>
                        <div id="featured3" className="carousel-item">
                            <img className="d-block" src="images/img_placeholder.png" alt="Third slide"/>
                            <div className="activityInfo">
                                <h3 className="title"></h3>
                                <h4 className="leaderName"></h4>
                                <p className="description"></p>
                                <h6 className="schedule"></h6>
                                <h6 className="roomSize"></h6>
                            </div>
                        </div>
                        <div id="featured4" className="carousel-item">
                            <img className="d-block" src="images/img_placeholder.png" alt="Fourth slide"/>
                            <div className="activityInfo">
                                <h3 className="title"></h3>
                                <h4 className="leaderName"></h4>
                                <p className="description"></p>
                                <h6 className="schedule"></h6>
                                <h6 className="roomSize"></h6>
                            </div>
                        </div>
                        <div id="featured5" className="carousel-item">
                            <img className="d-block" src="images/img_placeholder.png" alt="Fifth slide"/>
                            <div className="activityInfo">
                                <h3 className="title"></h3>
                                <h4 className="leaderName"></h4>
                                <p className="description"></p>
                                <h6 className="schedule"></h6>
                                <h6 className="roomSize"></h6>
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
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                    </ol>
                </div>

            </div>
            
        </div>
    )
}

export default FeaturedActivities;