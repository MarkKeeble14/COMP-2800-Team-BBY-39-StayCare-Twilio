import React from 'react'
import "./css/temp.css"
import { follow, Follow } from "react-twitter-widgets"
import { FacebookProvider, Like } from 'react-facebook';




const Intro = () => {
    return (
        
        <div id="landing">
            <h1 id="landing-title"><b>StayCare</b></h1>
            <p>Integer ultrices tempor orci, ullamcorper faucibus enim ultrices vitae. Proin sit amet scelerisque justo. 
                Aenean sed consequat urna. Cras mauris nunc, rutrum sed justo ac, posuere semper justo. Phasellus non quam rhoncus, tincidunt tortor ac, 
                malesuada velit. Mauris pellentesque odio vitae erat ultricies, a cursus enim cursus. Quisque consequat orci nec tincidunt tincidunt. 
                Suspendisse eu facilisis arcu. Maecenas eget lectus sem. Nulla iaculis at neque a rutrum. Phasellus vel maximus velit, sed imperdiet nisi. 
                Pellentesque dictum quam non euismod eleifend. Morbi rhoncus semper dui, eget consectetur mauris vehicula non.
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