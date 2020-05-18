import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout-no-nav"
import LandingContents from "../components/landing-cotents-about"
import AboutPictures from "../components/about-us-pictures"
import "../components/css/main.css"

const AboutPage = () => {
    return (
      <Layout>
        <SEO title="StayCare | About"/>
        <LandingContents></LandingContents>
        <AboutPictures></AboutPictures>
      </Layout>
    )
  }
  
  export default AboutPage