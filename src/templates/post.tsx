import React from 'react'

import { Link } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { graphql } from 'gatsby'

import MdxRenderer from '~/components/mdxRenderer'
import SEO from '~/components/seo'
import { Post } from '~/models'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    margin: theme.spacing(6, 0, 2),
    wordBreak: 'break-all',
    fontWeight: 700,
  },
  subtitle: {
    margin: theme.spacing(4, 0, 2),
    wordBreak: 'break-all',
    fontWeight: 700,
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  meta: {
    flexGrow: 1,
    textAlign: 'center',
    margin: theme.spacing(6, 0),
  },
  textMono: {
    fontFamily: 'Fira Code, monospace',
  },
}))

export interface PostTemplateProps {
  data: {
    post: Post
    hook?: {
      body: string
    }
    demo?: {
      body: string
    }
  }
}

function PostTemplate(props: PostTemplateProps) {
  const classes = useStyles()
  const { post, hook, demo } = props.data
  const { body, excerpt, frontmatter } = post
  const repoUrl = 'https://github.com/juliencrn/usehooks.ts'
  const editLink = `${repoUrl}/tree/develop/src/hooks/${post.fields.name}`

  return (
    <Container maxWidth="md">
      <SEO title={frontmatter.title} description={excerpt} />

      <Typography variant="h2" component="h1" className={classes.title}>
        {frontmatter.title}
        <Typography variant="h2" component="span" className={classes.textMono}>
          ()
        </Typography>
      </Typography>

      <MdxRenderer body={body} />

      {hook && (
        <>
          <Typography variant="h4" component="h2" className={classes.subtitle}>
            The Hook
          </Typography>
          <MdxRenderer body={hook.body} />
        </>
      )}

      {demo && (
        <>
          <Typography variant="h4" component="h2" className={classes.subtitle}>
            Usage
          </Typography>
          <MdxRenderer body={demo.body} />
        </>
      )}

      <Box my={6}>
        <Typography align="center" color="textSecondary">
          See a way to make this page better?
          <br />
          <Link href={editLink} target="_blank">
            Edit there »
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query ($id: String!, $hookId: String!, $demoId: String!) {
    post: mdx(id: { eq: $id }) {
      ...Post
    }
    hook: mdx(id: { eq: $hookId }) {
      body
    }
    demo: mdx(id: { eq: $demoId }) {
      body
    }
  }
`
