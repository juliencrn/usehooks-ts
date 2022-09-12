import dotenv from 'dotenv'
import type { GatsbyConfig } from 'gatsby'
import path from 'path'

import * as algolia from './src/libs/algolia'
import * as feed from './src/libs/feedSerializer'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const siteMetadata = {
  title: `usehooks-ts`,
  description: `Welcome to the documentation of usehooks-ts, a React hooks library, ready to use, written in typescript.`,
  siteUrl: `https://usehooks-ts.com`,
  author: `juliencrn`, // Github username
}

const config: GatsbyConfig = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '~': path.join(__dirname, 'src'),
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: 'remark-codesandbox/gatsby',
            options: {
              mode: 'button',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/generated`,
        name: `generated`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content`,
        name: `hooks`,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
        queries: algolia.queries,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            query: `${feed.query}`,
            output: '/rss.xml',
            title: `RSS Feed - ${siteMetadata.title}`,
            description: `${siteMetadata.description}`,
            serialize: ({ query }) => feed.serializer({ query, siteMetadata }),
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-132477935-3`,
        head: false, // Puts script in the head instead of the body
        anonymize: true,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteMetadata.siteUrl,
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#007ACC`,
        theme_color: `#007ACC`,
        display: `minimal-ui`,
        icon: `src/images/typescript.png`, // This path is relative to the root of the site.
      },
    },
  ],
}

export default config
