import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import About from "../components/about"

import "../components/css/main.css"

const AboutPage = () => {
    return (
      <Layout>
        <SEO title="StayCare | About"/>
        <About></About>
      </Layout>
    )
  }
  
  export default AboutPage