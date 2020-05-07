import React from "react"
import "./css/header.css"

const Navbar = () => {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-yellow w-shadow">
            <a className="navbar-brand" href="/">StayCare</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">My Activities</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Profile</a>
                    </li>
                    <li className="nav-item" id="post-link">
                        <a type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                            className="nav-link" href="#">Post Activity</a>
                    </li>
                </ul>

                <form className="form-inline my-2 my-lg-0" autoComplete="off">

                    <div className="autocomplete">
                        <input id="myInput" className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                    </div>

                    <button className="btn btn-outline-success my-2 my-sm-0 orange" type="submit">Search</button>
                </form>
            </div>
        </nav>
        </>
    )
  }

  export default Navbar
