import React from "react"
import $ from "jquery"
import "./css/header.css"
import { Link } from "gatsby"
import SearchBar from "./search"
import { clearForm } from "./js/post"
import {toggleNav} from "./js/search"

const Navbar = () => {

    function post() {
        toggleNav();
        clearForm();
        $("#featuredActivities").hide();
        $("#about-us-container").hide();
        $("#post-form").show();
    }

    function about() {
        toggleNav();
        $("#featuredActivities").hide();
        $("#post-form").hide();
        $("#about-us-container").show();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-yellow w-shadow">
            <Link to="/" id="home">StayCare</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" id="navToggler">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/room">My Activities</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login">login</Link>
                    </li>
                    <li className="nav-item" id="post-link" onClick={post}>
                        Post Activity
                    </li>
                    <li className="nav-item" id="worker-link"> 
                        Apply
                    </li>
                    <li className="nav-item" id="about-us-link" onClick={about}> 
                        About Us
                    </li>
                    <li className="nav-item">
                        <Link to="/login">Login</Link>
                    </li>

                </ul>
                <SearchBar />
            </div>
        </nav>
    )
  }

  export default Navbar