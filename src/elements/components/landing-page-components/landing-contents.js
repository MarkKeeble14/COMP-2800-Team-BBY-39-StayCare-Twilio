import React from 'react'
import FormArea from "./form-area"
import Intro from "./intro"
import NAV from "../used-across-pages-components/nav"
import SearchResults from "../used-across-pages-components/search-results"
import "../../css/temp.css"

// The basic contents of the landing page.
const LandingContents = () => {
    return (
    <div id="gradient">
        <NAV></NAV>
        <SearchResults/>
         <div id="content">
            <Intro></Intro>
            <FormArea></FormArea>
         </div>
    </div>
    )
}

export default LandingContents