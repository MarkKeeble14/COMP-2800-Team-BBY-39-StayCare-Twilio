import React from "react"
import "../../css/about.css"
import Img from "../used-across-pages-components/image"

// Holds the elements used on the top half of the 'About Us' page. Basically, the logo image, the text to the right of the logo image
// that tells users about StayCare, as well as the paragraph that communicates about us devs.
const About = () => {
    return (
        <div id="about-us-container">
            <div id="project-paragraph-container">
                <Img alt="Logo" filename="StayCare-02.png" />
                <p> Hey! We're the team behind StayCare, the online daycare! Our goal was to create some kind of service which would help give parents
                    an opportunity away from their kids while offering a fun, healthy, and interactive form of entertainment to the kids themselves.
                </p>
            </div>
            <div id="personal-paragraph-container">
                <p>
                    About us specifically, we're all students in BCIT's CST program, which meant that we had a ton to talk about right off the bat. 
                    We hit it off on our first day and developed a friendly team atmosphere built on laughter, learning, and of course, respect. 
                    It's been an absolute blast to work with one another on this project and we've all made serious progress in terms of our web development skills.
                    We cannot wait until we're able to flex our newfound muscles in the field!
                </p>
            </div>

        </div>
    )
}

export default About