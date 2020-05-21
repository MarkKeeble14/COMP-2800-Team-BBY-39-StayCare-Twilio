import React from "react"

import Layout from "../components/layout-no-nav"
import SEO from "../components/seo"
import LandingContents from "../components/contents-profile"
import CustomQueryString from "../components/query-string"

import "../components/js/firebase.js"
import "../components/css/main.css"
import "../components/css/temp.css"

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