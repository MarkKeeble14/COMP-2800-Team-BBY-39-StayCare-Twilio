import React from 'react'
import "./css/temp.css"
import { follow, Follow } from "react-twitter-widgets"
import { FacebookProvider, Like } from 'react-facebook';




// The title and paragraph on the landing page.
const Intro = () => {
    return (
        
        <div id="landing">
            <h1 id="landing-title"><b>StayCare</b></h1>
            <p>StayCare allows your young kids to participate in fun,
                and educational activities led by volunteers! As a bonus, all you busy parents currently working
                from home can feel good about entertaining your kids with these activities instead of just letting them
                watch tv or play video games!
            </p>

            <h3>Follow us on twitter!</h3>

            <Follow
                username="StayCareApp"
                options={{size:"large"}}
            />

            <h3>Or give us a like on Facebook!</h3>

            <FacebookProvider appId="886355398508956">
            <Like href="https://www.facebook.com/StayCare-102492371484201/" colorScheme="dark" showFaces share />
            </FacebookProvider>
            
            

           
        </div>
    )
}

export default Intro