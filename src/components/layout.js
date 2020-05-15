/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Profile from "../components/profile";
import Footer from "./footer"
import NAV from "./nav"

const Layout = ({ children }) => {
  return (
    <>
      <NAV />
      <Profile />
      <Footer />
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
