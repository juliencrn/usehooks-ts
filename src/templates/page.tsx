import React from 'react'
import { graphql } from 'gatsby'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import Layout from '../layout'
import SEO from '../components/seo'
import MdxRenderer from '../components/mdxRenderer'
import { PageTemplate, Page } from '../interfaces'
import Hero from '../components/hero'

export interface PageTemplateProps extends PageTemplate {
  pageContext: { pageId: string }
  data: { page: Page }
}

function PostTemplate({ path, data }: PageTemplateProps) {
  const { body, frontmatter } = data.page
  const { title, excerpt } = frontmatter

  return (
    <Layout>
      <SEO title={title} description={excerpt} path={path} />

      <Hero title={title} description={excerpt} />

      <Container maxWidth="md">
        <MdxRenderer>{body}</MdxRenderer>
        <Box py={3} />
      </Container>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query($pageId: String!) {
    page: mdx(id: { eq: $pageId }) {
      ...Page
    }
  }
`
