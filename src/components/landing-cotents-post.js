import React from 'react'
import "./css/temp.css"
import FormArea from "./form-area"
import Intro from "./intro"
import NAV from "./nav"
import SearchResults from "./search-results"
import PostActivity from "./post_form"
import About from "./about"

const LandingContents = () => {
    return (
    <div id="gradient">
        <NAV></NAV>
        <SearchResults/>
        <PostActivity></PostActivity>
    </div>
    )
}

export default LandingContents