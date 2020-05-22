import React from "react"
import Layout from "../elements/components/used-across-pages-components/layout"
import SEO from "../elements/components/used-across-pages-components/seo"

// This is the error page.
const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn't exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
