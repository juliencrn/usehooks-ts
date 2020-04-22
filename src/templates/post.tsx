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
import { PageTemplate, Post, Gist } from '../interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
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
}))

export interface PostTemplateProps extends PageTemplate {
  pageContext: {
    post: Post
    gist: Gist
    next: Post
    prev: Post
  }
}

const PostTemplate: FC<PostTemplateProps> = ({ pageContext }) => {
  const classes = useStyles()
  const { gist, next, post } = pageContext
  const { title } = post.frontmatter
  const date = moment(gist.updated).fromNow()

  return (
    <Layout container>
      <SEO title={title} description={post.excerpt} />

      <Typography variant="h2" component="h1" className={classes.title}>
        {title}
      </Typography>

      <MdxRenderer>{post.body}</MdxRenderer>

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
              <Link to={next.frontmatter.path} component={GatsbyLink}>
                {next.frontmatter.title}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default PostTemplate
