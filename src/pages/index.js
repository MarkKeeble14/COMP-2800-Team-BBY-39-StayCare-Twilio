import React from "react"
import Layout from "../elements/components/used-across-pages-components/layout-no-nav"
import SEO from "../elements/components/used-across-pages-components/seo"
import LandingContents from "../elements/components/landing-page-components/landing-contents"
import FeaturedActivities from "../elements/components/landing-page-components/featured-activities"

import "../elements/js/firebase.js"
import "../elements/css/main.css"
import "../elements/css/temp.css"

// This is the index (home) page.
const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home"/>
      <LandingContents></LandingContents>
      <FeaturedActivities></FeaturedActivities>
    </Layout>
  )
}

export default IndexPage