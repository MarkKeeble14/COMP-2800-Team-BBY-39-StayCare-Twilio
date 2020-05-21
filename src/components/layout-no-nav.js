/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import SignUpForActivity from "./signup-for-activity"

const Layout = ({ children }) => {
  return (
    <>
    <SignUpForActivity></SignUpForActivity>
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
