/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import BlurArea from "../components/blur_area"
import Profile from "../components/profile";
import SignupActivity from "./signup_for_activity"
import Footer from "./footer"

const Layout = ({ children }) => {
  return (
    <>
      <BlurArea></BlurArea>
      <Profile></Profile>
      <SignupActivity></SignupActivity>
      <Footer></Footer>
      <main id="layout-contents">
        {children}
      </main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
