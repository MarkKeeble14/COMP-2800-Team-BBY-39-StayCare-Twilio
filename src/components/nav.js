import React from "react"
import "./css/header.css"
import { Link } from "gatsby"
import SearchBar from "./search"
import { db } from "./js/firebase"
import { firebase } from "./js/firebase"
import $ from "jquery"

const Navbar = () => {
    // This removes/adds the class 'inactive' to elements depending on the status of authentication
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
            console.log('sucessfully signed you out');
          }, function(error) {
            // An error happened.
            console.log('could not logout: ' + error);
          });
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-yellow w-shadow" id="navbar">
            <a id='home' href='/'>StayCare</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" id="navToggler">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item inactive" id="post-link"><a href='/post-activity/' className='top-nav-link'>Post An Activity</a></li> 
                    <li className="nav-item inactive" id="room-link"><a href='/room/' className='top-nav-link'>My Activities</a></li>
                    <li className="nav-item inactive" id="activities-link"><a href='/activities/' className='top-nav-link'>All Activities</a></li>
                    <li className="nav-item inactive" id="profile-link"><a href='/profile/' className='top-nav-link'>Profile</a></li>
                    <li className="nav-item inactive" id="about-us-link"><a href='/about/' className='top-nav-link'>About the Creators</a></li>
                    <li className="nav-item" id="logout"><a id="logout-button" className="" href='/' className='top-nav-link'></a></li>
                </ul>
                <SearchBar/>
            </div>
        </nav>
    )
  }

  export default Navbar