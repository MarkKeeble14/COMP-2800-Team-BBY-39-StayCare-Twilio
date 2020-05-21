import React from 'react'
import "./css/temp.css"
import FormArea from "./form-area"
import Intro from "./intro"
import NAV from "./nav"
import SearchResults from "../components/search-results"
import About from "./about"
import AllActivities from "../components/show-all-activities"

const LandingContents = () => {
    return (
    <div id="gradient">
        <NAV></NAV>
        <SearchResults/>
        <AllActivities></AllActivities>
    </div>
    )
}

export default LandingContents