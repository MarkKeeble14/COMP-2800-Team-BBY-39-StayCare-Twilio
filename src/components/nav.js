import React from "react"
import "./css/header.css"
import { Link } from "gatsby"

const Navbar = () => {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-yellow w-shadow">
            <Link to="/">StayCare</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/">My Activities</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/login">Login</Link>
                    </li>
                    <li className="nav-item" id="post-link">
                        <Link to="/post-activity">Post Activity</Link>
                    </li>
                    <li className="nav-item" id="worker-link">
                        <Link 
                            to="/post-activity">Apply</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about">About Us</Link>
                    </li>
                </ul>

                <form className="form-inline my-2 my-lg-0" autoComplete="off">
                    <div className="autocomplete">
                        <input id="myInput" className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                    </div>
                    <button className="btn btn-outline-success my-2 my-sm-0 orange" type="submit" id="searchButton">Search</button>
                </form>
            </div>
        </nav>
        </>
    )
  }

  export default Navbar
