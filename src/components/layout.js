import React from "react"
import PropTypes from "prop-types"
import NAV from "./nav"
import SearchResults from "../components/search-results"

// Standard layout of pages.
const Layout = ({ children }) => {
  return (
    <>
      <NAV />
      <SearchResults/>
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
