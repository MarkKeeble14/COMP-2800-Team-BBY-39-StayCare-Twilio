import React from "react"
import Layout from "../elements/components/used-across-pages-components/layout-no-nav"
import SEO from "../elements/components/used-across-pages-components/seo"
import LandingContents from "../elements/components/about-components/contents-about"
import AboutPictures from "../elements/components/about-components/about-us-pictures"

import "../elements/css/main.css"

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