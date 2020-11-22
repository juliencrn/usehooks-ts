import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'

import { Post } from '../models'

const useStyles = makeStyles((theme: Theme) => ({
  article: {
    marginBottom: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(10),
    },
  },
  title: {
    fontFamily: 'Fira Code, monospace',
    wordBreak: 'break-all',
  },
}))

const PostCard: FC<Post> = ({ fields, frontmatter, shortDescription }) => {
  const classes = useStyles()

  return (
    <article className={classes.article}>
      <Typography variant="h4" component="h3" className={classes.title}>
        <Link to={fields.path} component={GatsbyLink} color="inherit">
          {`${frontmatter.title}()`}
        </Link>
      </Typography>
      <Box py={2} />
      <Typography variant="body1">{shortDescription}</Typography>
    </article>
  )
}

export default PostCard
