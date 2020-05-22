import React from "react"
import Layout from "../elements/components/used-across-pages-components/layout-no-nav"
import SEO from "../elements/components/used-across-pages-components/seo"
import LandingContents from "../elements/components/all-activities-components/contents-activities"

import "../elements/js/firebase.js"
import "../elements/css/main.css"
import "../elements/css/temp.css"

// This is the "My Activities" page.
const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Activities"/>
      <LandingContents></LandingContents>
    </Layout>
  )
}

export default IndexPage