import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SignUp from "../components/signUp"

import "../components/css/main.css"

const SignUpPage = () => {
    return (
      <Layout>
        <SEO title="StayCare | Signup"/>
        <SignUp></SignUp>
      </Layout>
    )
  }
  
  export default SignUpPage