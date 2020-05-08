import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostActivity from "../components/post_form"
import "../components/css/main.css"

const PostActivityPage = () => {
    return (
      <Layout>
        <SEO title="StayCare | About"/>
        <PostActivity></PostActivity>
      </Layout>
    )
  }
  
  export default PostActivityPage