import React, { FC } from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import { Typography, Link } from '@material-ui/core'

import Layout from '../layout'
import SEO from '../components/seo'
import MdxRenderer from '../components/mdxRenderer'
import Code from '../components/code'

const PostTemplate: FC<any> = ({ data, pageContext }) => {
  const { mdx: post } = data
  const { code } = pageContext

  const { title, description } = post.frontmatter

  return (
    <Layout container>
      <SEO title={title} description={description} />
      <Typography variant="h1" gutterBottom>
        {title}
      </Typography>

      <MdxRenderer>{post.body}</MdxRenderer>

      <Code code={code} />

      <Typography variant="body1">
        <Link component={GatsbyLink} to="/">
          Go back to the homepage
        </Link>
      </Typography>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        gistId
        keywords
        path
        title
      }
      body
    }
  }
`
