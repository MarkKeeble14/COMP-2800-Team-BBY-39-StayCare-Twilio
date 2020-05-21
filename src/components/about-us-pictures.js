import React, { useEffect } from "react"
import "./css/about.css"
import Img from "./image"
import $ from "jquery"

// Component that holds all of the pictures of the dev's on the about us page. It also has the code
// for our easter egg. Click on Mark's face, then Jakob's, Justin's, and finally Jonnies! 
const PictureContainers = () => {

    // Tells React to continousely run this in case of updates.
    useEffect(() => {
        if (typeof window !== "undefined" && typeof window.document !== "undefined") {
            console.log('easter egg');
            var easterEgg = 0;
            var mark = $('#mk');
            var jonny = $('#jo');
            var justin = $('#jx');
            var jakob = $('#jf');
    
            // if the variable mark is set and it is clicked, advance the egg! 
            if (mark) {
                mark.on('click', function() {
                    if (easterEgg === 0) {
                        easterEgg++;
                        console.log(easterEgg);
                    }        
                });
            }
            
            // if the variable jakob is set, it is clicked, and mark was already clicked, advance the egg!
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
    
            // same as the above chunk just with different subjects.
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

            // if the rest of the egg has been completed in order, replace certain elements on screen with these other elements.
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
        }
        }, null);

    return (
        <div>  
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

        </div>
    )
}

export default PictureContainers