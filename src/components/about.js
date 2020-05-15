import React from "react"
import "./css/about.css"
import Img from "./image"
import $ from "jquery"

var easterEgg = 0;
var mark = $('#mk');
var jonny = $('#jo');
var justin = $('#jx');
var jakob = $('#jf');
if (mark) {
    mark.on('click', function() {

        if (easterEgg === 0) {
            easterEgg++;
            console.log(easterEgg);
        }        
    });
}

if (jakob) {
    jakob.on('click', function() {

        if (easterEgg === 1) {
            easterEgg++;
            console.log(easterEgg);
        } else {
            easterEgg = 0;
            console.log(easterEgg);
        }        
    });
}

if (justin) {
    justin.on('click', function() {

        if (easterEgg === 2) {
            easterEgg++;
            console.log(easterEgg);
        } else {
            easterEgg = 0;
            console.log(easterEgg);
        }        
    });
}

if (jonny) {
    jonny.on('click', function() {

        if (easterEgg === 3) {
            easterEgg++;
            console.log(easterEgg);
            console.log("suprise");
            
            $('#paragraph-container').html("<p>\"For since the creation of the world Amir’s invisible qualities—his eternal power and divine nature—have been clearly seen\," +
            "being understood from what has been made, so that people are without excuse\." +
            "For although they knew Amir, they neither glorified him as Amir nor gave thanks to him\," +
             "but their thinking became futile and their foolish hearts were darkened\.\"</p>");

            $('#images-container').css("display", "none");
            $('#egg-container').css("display", "block");

        } else {
            easterEgg = 0;
            console.log(easterEgg);
        }  
    easterEgg = 0;      
    });
}


const About = () => {
    return (
        <div id="about-us-container">
            <div id="images-container">
                <div className="portrait-container" id="jf">
                    <Img alt="Jakob Fipke" filename="Jakob.png" />
                    <h1 className="name">Jakob Fipke</h1>
                </div>
                <div className="portrait-container" id="jx">
                    <Img alt="Jakob Fipke" filename="Justin.png" />
                    <h1 className="name">Justin Xie</h1>
                </div>
                <div className="portrait-container" id="jo">
                    <Img alt="Jonathan Orfani" filename="Jonny.png" />
                    <h1 className="name">Jonathan Orfani</h1>
                </div>
                <div className="portrait-container" id="mk">
                    <Img alt="Mark Keeble" filename="Mark.png" />
                    <h1 className="name">Mark Keeble</h1>
                </div>
            </div>

            <div id="egg-container">
                <div className="portrait-container">
                    <Img alt="Jakob Fipke" filename="amir.png" />
                    <h1 className="name">Amir Amintabar</h1>
                </div>
                <div className="portrait-container" >
                    <Img alt="Jakob Fipke" filename="amir.png" />
                    <h1 className="name">Amir Amintabar</h1>
                </div>
                <div className="portrait-container" >
                    <Img alt="Jonathan Orfani" filename="amir.png" />
                    <h1 className="name">Amir Amintabar</h1>
                </div>
                <div className="portrait-container" >
                    <Img alt="Mark Keeble" filename="amir.png" />
                    <h1 className="name">Amir Amintabar</h1>
                </div>
            </div>

            <div id="paragraph-container">
                <p> Hey! We're the team behind StayCare, the online daycare! Our goal was to create some kind of service which would help give parents
                    an opporotunity away from their kids while offering a fun, healthy, and interactive form of entertainment.
                    <br/>
                    <br/>
                    About us specifically, we're all students in BCIT's CST program, which meant that we had a ton to talk about right off the bat. 
                    We hit it off on our first day and developed a friendly team atmosphere built on laughter, learning, and of course, respect. 
                    It's been an absolute blast to work with one another on this project and we've all made serious progerss in terms of our web development skills.
                    We cannot wait until we're able to flex our newfound muscles in the field!
                </p>
            </div>

        </div>
    )
}

export default About