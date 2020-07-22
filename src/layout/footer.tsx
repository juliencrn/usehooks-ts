import React, { FC } from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'

import useSiteMetadata from '../hooks/useSiteMetadata'

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
}))

const Footer: FC = () => {
  const classes = useStyles()
  const { author } = useSiteMetadata()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Typography variant="body1" color="textSecondary">
          <Link href="/about" color="inherit">
            Uncopyright
          </Link>
          , built with
          {` `}
          <Link
            href="https://www.gatsbyjs.org"
            color="inherit"
            target="_blank"
            rel="noreferrer"
          >
            Gatsby
          </Link>
          {` `}
          and
          {` `}
          <Link
            href="https://material-ui.com/"
            color="inherit"
            target="_blank"
            rel="noreferrer"
          >
            @Material-ui
          </Link>
          , written in{' '}
          <Link
            href="https://www.typescriptlang.org"
            color="inherit"
            target="_blank"
            rel="noreferrer"
          >
            Typescript
          </Link>
          {` `}
          by
          {` `}
          <Link
            href={author.github}
            color="inherit"
            target="_blank"
            rel="noreferrer"
          >
            {author.name}
          </Link>{' '}
          and hosted on
          {` `}
          <Link
            href="https://www.netlify.com/"
            color="inherit"
            target="_blank"
            rel="noreferrer"
          >
            Netlify
          </Link>
          .
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer
