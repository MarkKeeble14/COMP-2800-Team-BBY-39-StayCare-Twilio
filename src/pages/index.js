import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../components/js/firebase.js"
import Blur from "../components/blur_area"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="StayCare | Home"/>
      <Blur></Blur>
    </Layout>
  )
}

export default IndexPage