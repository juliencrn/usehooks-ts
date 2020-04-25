import React, { FC } from 'react'
import moment from 'moment'
import { Link as GatsbyLink } from 'gatsby'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import Layout from '../layout'
import SEO from '../components/seo'
import MdxRenderer from '../components/mdxRenderer'
import Code from '../components/code'
import { PageTemplate, Post } from '../interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontFamily: 'Fira Code',
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
    fontFamily: 'Fira Code',
  },
}))

export interface PostTemplateProps extends PageTemplate {
  pageContext: {
    post: Post
    next: Post
    prev: Post
  }
}

const PostTemplate: FC<PostTemplateProps> = ({ pageContext, path }) => {
  const classes = useStyles()
  const { next, post } = pageContext
  const { body, excerpt, gist, frontmatter } = post
  const { title } = frontmatter
  const date = moment(gist.updated).fromNow()

  return (
    <Layout container>
      <SEO title={title} description={excerpt} path={path} />

      <Typography variant="h3" component="h1" className={classes.title}>
        {`${title}()`}
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
              <Link href={gist.url} target="_blank">
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
    </Layout>
  )
}

export default PostTemplate
