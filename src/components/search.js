import React from "react"
import {search} from "./js/search"
import {results} from "./js/search"
import {getSearchResults} from "./js/search"
import {autocomplete} from "./js/search"
import {showSearchResults} from "./js/search"
import {showActivity} from "./js/search"
import {getWrittenDate} from "./js/search"
import {clearSearchResults} from "./js/search"
import {clearInput} from "./js/search"
import {toggleNav} from "./js/search"

const SearchBar = () => {
    clearSearchResults();
    getSearchResults(["activities"]);
    return (
        <form id="searchForm" className="form-inline my-2 my-lg-0" autoComplete="off">
            <div className="autocomplete">
                <input id="myInput" className="form-control mr-sm-2" type="text" placeholder="Search"
                    aria-label="Search" onFocus={clearInput}></input>
            </div>
            <button id="searchButton" className="btn my-2 my-sm-0 orange" type="button" 
                    onClick={showSearchResults}>Search</button>
        </form>
    )
}

export default SearchBar
