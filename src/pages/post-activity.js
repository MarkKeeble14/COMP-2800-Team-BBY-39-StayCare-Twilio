import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostForm from "../components/post_form"
import "../components/css/main.css"

const PostActivityPage = () => {
    return (
      <Layout>
        <SEO title="StayCare | Post"/>
        <PostForm></PostForm>
      </Layout>
    )
  }
  
  export default PostActivityPage