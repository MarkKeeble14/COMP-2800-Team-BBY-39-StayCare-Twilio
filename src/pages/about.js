import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout-no-nav"
import LandingContents from "../components/contents-about"
import AboutPictures from "../components/about-us-pictures"

import "../components/css/main.css"

// This is the "About Us" Page.
const AboutPage = () => {
    return (
      <Layout>
        <SEO title="About"/>
        <LandingContents></LandingContents>
        <AboutPictures></AboutPictures>
      </Layout>
    )
  }
  
  export default AboutPage