import React from "react"
import Layout from "../elements/components/used-across-pages-components/layout-no-nav"
import SEO from "../elements/components/used-across-pages-components/seo"
import LandingContents from "../elements/components/post-activity-components/contents-post"

import "../elements/css/main.css"

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