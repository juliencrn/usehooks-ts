import React, { FC } from 'react'
import { navigate } from 'gatsby'

import Container from '@material-ui/core/Container'

import Layout from '../layout'
import SEO from '../components/seo'
import Hero from '../components/hero'

/**
 * I use this page for testing my hooks,
 * it does not appear in production.
 *
 * The hook is implemented in the "Component" comp,
 * and called below in the "TestPage" page.
 */

// Usage
const Component: FC = () => {
  return <div>Example</div>
}

const TestPage: FC = () => {
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    navigate('/')
  }

  return (
    <Layout>
      <SEO title="Tests page" />

      <Hero
        title="Tests page"
        description="I use this page for testing my hooks, it does not appear in production."
      />

      <Container maxWidth="md">
        <Component />
      </Container>
    </Layout>
  )
}

export default TestPage
