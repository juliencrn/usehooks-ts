import React, { FC } from 'react'

import Typography from '@material-ui/core/Typography'

import Layout from '../layout'
import SEO from '../components/seo'

const NotFoundPage: FC = () => (
  <Layout container>
    <SEO title="404: Not found" />
    <Typography variant="h2" gutterBottom component="h1">
      NOT FOUND
    </Typography>
    <Typography variant="body1">
      You just hit a route that doesn&#39;t exist... the sadness.
    </Typography>
  </Layout>
)

export default NotFoundPage
