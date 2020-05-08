import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Login from "../components/login"
import PostForm from "../components/post_form"
import "../components/css/main.css"

const LoginPage = () => {
    return (
      <Layout>
        <SEO title="StayCare | Login"/>
        <Login></Login>
        <PostForm></PostForm>
      </Layout>
    )
  }
  
  export default LoginPage