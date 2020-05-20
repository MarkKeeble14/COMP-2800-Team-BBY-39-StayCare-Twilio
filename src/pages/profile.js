import React from "react"

import Layout from "../components/layout-no-nav"
import SEO from "../components/seo"
import LandingContents from "../components/landing-cotents-profile"
import "../components/js/firebase.js"
import "../components/css/main.css"
import "../components/css/temp.css"
import CustomQueryString from "../components/custom-query-string"

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