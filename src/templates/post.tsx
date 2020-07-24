import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link as GatsbyLink, graphql } from 'gatsby'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import SEO from '../components/seo'
import MdxRenderer from '../components/mdxRenderer'
import Code from '../components/code'
import { PageTemplate, Post, Gist } from '../interfaces'
import { Container } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
  title: {
    fontFamily: 'Fira Code, monospace',
    margin: theme.spacing(3, 0),
    wordBreak: 'break-all',
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(6, 0, 4),
    },
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  meta: {
    flexGrow: 1,
    textAlign: 'center',
    margin: theme.spacing(6, 0),
  },
  metaValue: {
    fontFamily: 'Fira Code, monospace',
  },
}))

export interface PostTemplateProps extends PageTemplate {
  pageContext: {
    gist: Gist
  }
  data: {
    post: Post
    next: Post
    prev: Post
  }
}

function PostTemplate({ pageContext, path, data }: PostTemplateProps) {
  const classes = useStyles()
  const { gist } = pageContext
  const { next, post } = data
  const { body, excerpt, frontmatter } = post
  const title = `${frontmatter.title}()`
  const date = formatDistanceToNow(new Date(gist.updated), {
    addSuffix: true,
  })

  return (
    <Container className={classes.root} maxWidth="md">
      <SEO title={title} description={excerpt} path={path} isPost />

      <Typography variant="h3" component="h1" className={classes.title}>
        {title}
      </Typography>

      <MdxRenderer>{body}</MdxRenderer>

      <Code code={gist.code} />

      <Box className={classes.meta}>
        <Grid container alignItems="center" alignContent="center" spacing={3}>
          <Grid item xs={12} md>
            <Typography variant="body1" align="center">
              Updated:
              <br />
              {date}
            </Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} md>
            <Typography variant="body1" align="center">
              Would you like to report something?
              <br />
              <Link href={gist.url} target="_blank" rel="noreferrer">
                Leave a comment on github.
              </Link>
            </Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} md>
            <Typography variant="body1" align="center">
              Next hook:
              <br />
              <Link
                to={next.frontmatter.path}
                className={classes.metaValue}
                component={GatsbyLink}
              >
                {`${next.frontmatter.title}()`}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query($postId: String!, $nextId: String!, $prevId: String!) {
    post: mdx(id: { eq: $postId }) {
      ...Post
    }
    prev: mdx(id: { eq: $prevId }) {
      ...Post
    }
    next: mdx(id: { eq: $nextId }) {
      ...Post
    }
  }
`
