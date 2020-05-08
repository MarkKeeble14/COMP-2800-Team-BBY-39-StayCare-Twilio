import React from "react"
import "./css/about.css"
import Img from "./image"

const About = () => {
    return (
        <div id="about-us-container">
            <div id="images-container">
                <div className="portrait-container">
                    <Img alt="Jakob Fipke" filename="Jakob.png"/>
                    <h1>Jakob Fipke</h1>
                </div>
                <div className="portrait-container">
                    <Img alt="Jakob Fipke" filename="Justin.png"/>
                    <h1>Justin Xie</h1>
                </div>
                <div className="portrait-container">
                    <Img alt="Jakob Fipke" filename="Jonny.png"/>
                    <h1>Jonathan Orfani</h1>
                </div>
                <div className="portrait-container">
                    <Img alt="Mark Keeble" filename="Mark.png"/>
                    <h1>Mark Keeble</h1>
                </div>
            </div>
            <div id="paragraph-container">
                <p>Hey! We're the team behind StayCare, the online daycare! We're all students in BCIT's CST program, which meant that we 
                    had a ton to talk about right off the bat. We hit it off on our first day and developed a friendly team atmosphere built 
                    on laughter, learning, and of course, respect. It's been an absolute blast to work with one another on this project and 
                    we've all made serious progerss in terms of our web development skills. We cannot wait until we're able to flex our newfound 
                    muscles in the field!
                </p>
            </div>
        </div>
    )
}

export default About