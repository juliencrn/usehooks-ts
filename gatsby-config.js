/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
const moment = require('moment')
const algoliaQueries = require('./gatsby/algolia')
const queries = require('./gatsby/queries')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const siteMetadata = {
  title: `useHooks.ts`,
  description: `Simple React hooks ready to use written in typescript.`,
  siteUrl: `https://usehooks-typescript.com`,
  author: {
    name: 'Julien CARON',
    content: 'I like build some things using Javascript',
    github: 'https://github.com/Junscuzzy',
  },
  social: {
    github: 'https://github.com/Junscuzzy/usehooks.ts',
  },
}

module.exports = {
  siteMetadata,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `pages`,
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
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
        indexName: process.env.GATSBY_ALGOLIA_SEARCH_KEY, // for all queries
        queries: algoliaQueries,
        // enablePartialUpdates: true, // default: false
        chunkSize: 10000, // default: 1000
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            query: `${queries.postQuery}`,
            output: '/rss.xml',
            title: `RSS Feed - ${siteMetadata.title}`,
            description: `${siteMetadata.description}`,
            serialize: ({ query: { posts } }) => {
              return posts.edges.map(({ node }) => {
                const { title, path, date } = node.frontmatter
                return {
                  title: `${title}`,
                  description: node.excerpt || '',
                  author: siteMetadata.author.name,
                  date: moment(date).toString(),
                  url: `${siteMetadata.siteUrl}${path}`,
                  guid: `${siteMetadata.siteUrl}${path}`,
                }
              })
            },
          },
        ],
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-132477935-3`,
        head: false, // Puts script in the head instead of the body
        anonymize: true,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteMetadata.siteUrl,
        sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }],
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
