import React from 'react'
import "./css/temp.css"
import FormArea from "./form-area"
import Intro from "./intro"
import NAV from "./nav"
import SearchResults from "../components/search-results"

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