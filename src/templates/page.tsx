import React from 'react'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { graphql } from 'gatsby'

import Hero from '~/components/hero'
import MdxRenderer from '~/components/mdxRenderer'
import SEO from '~/components/seo'
import { Page, PageTemplate } from '~/models'

export interface PageTemplateProps extends PageTemplate {
  pageContext: { pageId: string }
  data: { page: Page }
}

function PostTemplate({ data, location }: PageTemplateProps) {
  const { body, frontmatter } = data.page
  const { title, excerpt } = frontmatter

  return (
    <>
      <SEO title={title} description={excerpt} location={location} />

      <Hero title={title} description={excerpt} />

      <Container maxWidth="md">
        <MdxRenderer body={body} />
        <Box py={3} />
      </Container>
    </>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query ($id: String!) {
    page: mdx(id: { eq: $id }) {
      ...Page
    }
  }
`
