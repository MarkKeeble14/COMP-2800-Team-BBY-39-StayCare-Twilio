import React, { Component, useEffect } from "react";
import $ from "jquery"
import {db} from "./js/firebase"
import {firebase} from "./js/firebase"
import classnames from "classnames";
import "./css/footer.css"

function toggle() {
    var blur = document.getElementById('blur');
    if (blur != null) {
        blur.classList.toggle('active');
    }

    var profile = document.getElementById('profile-card');
    if (profile != null) {
        profile.classList.toggle('active');
    }
}

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevScrollpos: 0,
      visible: true
    };
  }

  // Adds an event listener when the component is mount.
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    // Set Name
    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null) {
        console.log('logged in as: ' + user.email);
        $('#footer-name-display').text(user.email);
      }
    })
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // Hide or show the menu.
  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };

  render() {
    return (
      <footer
        className={classnames("footer", {
          "footer--hidden": !this.state.visible
        })}
      >
            <img src="https://dummyimage.com/400x400/000/fff" alt="pic" id="profile-pic" className="rounded-circle"
                onClick={toggle}/>
            <h1 id="footer-name-display"></h1>
      </footer>
    );
  }
}