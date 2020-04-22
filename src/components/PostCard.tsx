import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import { Post } from '../interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  article: {
    marginBottom: theme.spacing(6),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(10),
    },
  },
  title: {},
}))

const PostCard: FC<Post> = ({ frontmatter, shortDescription }) => {
  const classes = useStyles()
  const { title, path } = frontmatter

  return (
    <article className={classes.article}>
      <Typography variant="h3" className={classes.title}>
        <Link to={path} component={GatsbyLink} color="inherit">
          {title}
        </Link>
      </Typography>
      <Box py={2} />
      <Typography variant="body1">{shortDescription}</Typography>
    </article>
  )
}

export default PostCard
