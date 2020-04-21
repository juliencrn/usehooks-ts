import React, { FC } from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import { Typography, Link } from '@material-ui/core'

import Layout from '../layout'
import SEO from '../components/seo'
import MdxRenderer from '../components/mdxRenderer'
import Code from '../components/code'
import { PageTemplate, Post } from '../utils/interfaces'

export interface PostTemplateProps extends PageTemplate {
  data: {
    mdx: Post
  }
  pageContext: {
    code?: string
    next: Post
    prev: Post
  }
}

const PostTemplate: FC<PostTemplateProps> = props => {
  const { data, pageContext } = props
  const { mdx: post } = data
  const { code, prev, next } = pageContext
  const { title } = post.frontmatter

  // console.log('pagination:', {
  //   props,
  //   post,
  //   current: title,
  //   next: next.frontmatter.title,
  //   prev: prev.frontmatter.title,
  // })

  return (
    <Layout container>
      <SEO title={title} description={post.excerpt} />
      <Typography variant="h1" gutterBottom>
        {title}
      </Typography>

      <MdxRenderer>{post.body}</MdxRenderer>

      {code && <Code code={code} />}

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
      ...postFragment
    }
  }
`
