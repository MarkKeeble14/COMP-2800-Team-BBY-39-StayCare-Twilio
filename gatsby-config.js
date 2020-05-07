module.exports = {
  siteMetadata: {
    title: `StayCare`,
    description: `This is a fun place for young children to participate in real-time activities hosted by certified child care workers! 
    We aim to give children the social interaction they need during this time, and give parents a much-needed moment of respite, 
    away from their child.`,
    author: `@StayCare Team`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `StayCare | Online Daycare`,
        short_name: ``,
        start_url: `/`,
        background_color: `#ff8000`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/StayCare-02-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
