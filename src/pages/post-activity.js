import React from "react"
import Layout from "../components/layout-no-nav"
import SEO from "../components/seo"
import LandingContents from "../components/contents-post"
import "../components/css/main.css"

// This is the page where workers can post an activity.
const PostActivityPage = () => {
    return (
      <Layout>
        <SEO title="Post An Activity"/>
        <LandingContents></LandingContents>
      </Layout>
    )
  }
  
  export default PostActivityPage