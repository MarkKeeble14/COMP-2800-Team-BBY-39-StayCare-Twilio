import React from "react"
import NAV from "../components/nav"
import FeaturedActivities from "../components/featured_activities"
import AboutUs from "./about"
import PostForm from "./post_form"

const BlurArea = () => {
    return (
        <div id="blur">
            <NAV></NAV>
            <FeaturedActivities></FeaturedActivities>
            <AboutUs></AboutUs>
            <PostForm></PostForm>
      </div>
    )
}

export default BlurArea