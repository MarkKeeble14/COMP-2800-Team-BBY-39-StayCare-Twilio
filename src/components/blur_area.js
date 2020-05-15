import React from "react"
import FeaturedActivities from "../components/featured_activities"
import SearchResults from "../components/search-results"
import PostForm from "../components/post_form"
import About from "../components/about"

const BlurArea = () => {
    return (
        <div id="blur">
            <SearchResults />
            <PostForm />
            <FeaturedActivities />
            <About />
        </div>
    )
}

export default BlurArea