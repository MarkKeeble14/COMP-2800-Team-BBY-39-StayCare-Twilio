import React from 'react'
import "../../css/temp.css"
import NAV from "../used-across-pages-components/nav"
import SearchResults from "../used-across-pages-components/search-results"
import About from "./about"

// The basic contents of the about-us page.
const LandingContents = () => {
    return (
    <div id="gradient">
        <NAV></NAV>
        <SearchResults/>
        <About></About>
    </div>
    )
}

export default LandingContents