import React from "react"
import PropTypes from "prop-types"
import SignUpForActivity from "./signup-for-activity"

// Basic layout for pages without the navbar embedded. 
// The navbar will be embedded within the div with the id 'gradient' if this Layout should be used.
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
