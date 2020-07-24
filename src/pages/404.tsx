import React, { FC } from 'react'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import SEO from '../components/seo'

const NotFoundPage: FC = () => (
  <Container maxWidth="md">
    <SEO title="404: Not found" />
    <Typography variant="h2" gutterBottom component="h1">
      NOT FOUND
    </Typography>
    <Typography variant="body1">
      You just hit a route that doesn&#39;t exist... the sadness.
    </Typography>
  </Container>
)

export default NotFoundPage
