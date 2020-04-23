/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
const algoliaQueries = require('./gatsby/algolia')

require('dotenv').config({ path: `.env` })

module.exports = {
  siteMetadata: {
    title: `useHooks.ts`,
    description: `Simple React hooks ready to use written in typescript.`,
    author: {
      name: 'Julien CARON',
      content: 'I like build some things using Javascript',
      github: 'https://github.com/Junscuzzy',
    },
    social: {
      github: 'https://github.com/Junscuzzy/usehooks.ts',
    },
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`],
        plugins: [],
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        indexName: process.env.ALGOLIA_SEARCH_KEY, // for all queries
        queries: algoliaQueries,
        enablePartialUpdates: true,
        chunkSize: 10000, // default: 1000
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
        head: false, // Puts script in the head instead of the body
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
