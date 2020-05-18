import React from "react"
import Layout from "../components/layout-no-nav"
import SEO from "../components/seo"
import PostForm from "../components/post_form"
import LandingContents from "../components/landing-cotents-post"
import "../components/css/main.css"

const PostActivityPage = () => {
    return (
      <Layout>
        <SEO title="StayCare | Post"/>
        <LandingContents></LandingContents>
      </Layout>
    )
  }
  
  export default PostActivityPage