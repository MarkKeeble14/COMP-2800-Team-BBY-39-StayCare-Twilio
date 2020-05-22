import React from 'react'
import "../../css/temp.css"
import NAV from "../used-across-pages-components/nav"
import SearchResults from "../used-across-pages-components/search-results"
import PostActivity from "./post-form"

// The basic contents of the post-activity page.
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