import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'

import Layout from '../layout'
import SEO from '../components/seo'
import { Typography, Link } from '@material-ui/core'

const SecondPage: FC = () => (
  <Layout container>
    <SEO title="Page two" />
    <Typography variant="h2" gutterBottom component="h1">
      Hi from the second page
    </Typography>

    <Typography variant="body1">Welcome to page 2.</Typography>

    <Typography variant="body1">
      <Link component={GatsbyLink} to="/">
        Go back to the homepage
      </Link>
    </Typography>
  </Layout>
)

export default SecondPage
