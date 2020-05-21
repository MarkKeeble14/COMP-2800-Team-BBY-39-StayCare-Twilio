import React from "react"
import "./css/header.css"
import { Link } from "gatsby"
import SearchBar from "./search"
import { db } from "./js/firebase"
import { firebase } from "./js/firebase"
import $ from "jquery"

const Navbar = () => {
    function DetermineWhatToRender() {
        firebase.auth().onAuthStateChanged(function(user) {
            $('#about-us-link').removeClass('inactive');
            if (user) {
                // User is signed in.
                db.collection('users').doc(user.uid)
                .get()
                .then(function(userDoc) {
                    if (userDoc.exists) {
                        if (userDoc.data().isWorker) {
                            $('#post-link').removeClass('inactive');
                        }
                        $('#room-link').removeClass('inactive');
                        $('#activities-link').removeClass('inactive');
                        $('#profile-link').removeClass('inactive');
                        $('#logout-button').html(userDoc.data().email + ', logout?');
                        $('#logout-button').on('click', function() {
                            Logout();
                        })
                    }
              })
              .catch(function(error) {
                 console.log(error); 
              });
            } else {
              // No user is signed in.
              $('#logout-button').addClass('inactive');
              $('.middled-button').addClass('inactive');
            }
          });
    }
    DetermineWhatToRender();

    function Logout() {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            window.location.replace("./");
          }, function(error) {
            // An error happened.
            console.log('could not logout: ' + error);
          });
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-yellow w-shadow" id="navbar">
            <Link to="/" id="home">StayCare</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" id="navToggler">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item inactive" id="post-link"><Link className='nav-bar-link' to="/post-activity">Post Activity</Link></li> 
                    <li className="nav-item inactive" id="room-link"><Link className='nav-bar-link' to="/room">My Activities</Link></li>
                    <li className="nav-item inactive" id="activities-link"><Link className='nav-bar-link' to="/activities">All Activities</Link></li>
                    <li className="nav-item inactive" id="profile-link"><Link className='nav-bar-link' to="/profile">Profile</Link></li>
                    <li className="nav-item inactive" id="about-us-link"><Link className='nav-bar-link' to="/about">About The Creators</Link></li>
                    <li className="nav-item" id="logout"><p id="logout-button" className=""/></li>
                </ul>
                <SearchBar/>
            </div>
        </nav>
    )
  }

  export default Navbar