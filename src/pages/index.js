import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../components/js/firebase.js"
import BlurArea from "../components/blur_area"
import SignupActivity from "../components/signup_for_activity"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="StayCare | Home"/>
      <BlurArea></BlurArea>
      <SignupActivity></SignupActivity>
    </Layout>
  )
}

export default IndexPage