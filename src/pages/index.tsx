import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import Layout from '../layout'
import SEO from '../components/seo'
import Hero from '../components/hero'

const useStyles = makeStyles((theme: Theme) => ({
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}))

const IndexPage: FC = () => {
  const classes = useStyles()
  return (
    <Layout>
      <SEO title="Home" />
      <Hero
        title="Hi people"
        description="Welcome to your new Gatsby site. Now go build something great with
          Typescript and Material-ui."
      >
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                component={GatsbyLink}
                to="/page-2/"
                variant="contained"
                color="primary"
              >
                Go to page 2
              </Button>
            </Grid>
          </Grid>
        </div>
      </Hero>
    </Layout>
  )
}

export default IndexPage
