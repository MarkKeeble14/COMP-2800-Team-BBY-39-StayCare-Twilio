import React from "react"
import Layout from "../elements/components/used-across-pages-components/layout-no-nav"
import SEO from "../elements/components/used-across-pages-components/seo"
import LandingContents from "../elements/components/profile-components/contents-profile"
import CustomQueryString from "../elements/components/used-across-pages-components/query-string"

import "../elements/js/firebase.js"
import "../elements/css/main.css"
import "../elements/css/temp.css"

// This is the "My Profile" page as well as other profiles.
const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Profile"/>
      <CustomQueryString></CustomQueryString>
      <LandingContents></LandingContents>
    </Layout>
  )
}

export default IndexPage