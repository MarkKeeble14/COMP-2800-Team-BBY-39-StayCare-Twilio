import React from "react"

import Layout from "../components/layout-no-nav"
import SEO from "../components/seo"

import "../components/js/firebase.js"
import LandingContents from "../components/landing-cotents"
import Blur from "../components/blur_area"
import "../components/css/main.css"
import "../components/css/temp.css"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="StayCare | Home"/>
      <LandingContents></LandingContents>
      <Blur></Blur>
    </Layout>
  )
}

export default IndexPage