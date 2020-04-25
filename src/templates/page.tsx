import React, { FC } from 'react'

import Container from '@material-ui/core/Container'

import Layout from '../layout'
import SEO from '../components/seo'
import MdxRenderer from '../components/mdxRenderer'
import { PageTemplate, Page } from '../interfaces'
import Hero from '../components/hero'
import { Box } from '@material-ui/core'

export interface PageTemplateProps extends PageTemplate {
  pageContext: {
    page: Page
  }
}

const PostTemplate: FC<PageTemplateProps> = ({ pageContext, path }) => {
  const { body, frontmatter } = pageContext.page
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
