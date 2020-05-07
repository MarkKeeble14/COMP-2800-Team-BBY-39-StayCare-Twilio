import React from 'react'
import "./css/featured_activities.css"
import "./js/carousel_controller.js"

const FeaturedActivities = () => {
    return (
        <div id="featuredActivities">
            <h1 id="title">Featured Activities</h1>
            <div id="carouselContainer">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="https://dummyimage.com/600x400/000/fff" alt="First slide"/>
                            <div className="caption centerDiv">
                                <h2>Finger Painting</h2>
                                <h3>Amanada</h3>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://dummyimage.com/600x400/000/fff" alt="Second slide"/>
                            <div className="caption centerDiv">
                                <h2>Story Telling</h2>
                                <h3>Paul</h3>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://dummyimage.com/600x400/000/fff" alt="Third slide"/>
                            <div className="caption centerDiv">
                                <h2>Music Lessons</h2>
                                <h3>Johanna</h3>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default FeaturedActivities;