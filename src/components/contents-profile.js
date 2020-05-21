import React from 'react'
import "./css/temp.css"
import NAV from "./nav"
import SearchResults from "./search-results"
import Profile from "./profile"

// The basic contents of the profile page.
const LandingContents = () => {
    return (
    <div id="gradient">
        <NAV></NAV>
        <SearchResults/>
        <Profile></Profile>
    </div>
    )
}

export default LandingContents