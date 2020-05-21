import React from 'react'
import "./css/temp.css"
import NAV from "./nav"
import SearchResults from "./search-results"
import AllActivities from "./show-all-activities"

// The basic contents of the all-activities page.
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