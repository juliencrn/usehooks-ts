import React from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Hidden from '@material-ui/core/Hidden'

import useSiteMetadata from '../hooks/useSiteMetadata'

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
}))

function Footer() {
  const classes = useStyles()
  const { author } = useSiteMetadata()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Typography variant="body1" color="textSecondary" align="center">
          <Link href="/about" color="inherit">
            Uncopyright
          </Link>
          ,
          <Hidden xsDown>
            {` `}
            built with
            {` `}
            <Link
              href="https://www.gatsbyjs.org"
              color="inherit"
              target="_blank"
              rel="noreferrer"
            >
              Gatsby
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
          </Hidden>
          {` `}
          by
          {` `}
          <Link
            href={`http://github.com/${author}`}
            color="inherit"
            target="_blank"
            rel="noreferrer"
          >
            {author}
          </Link>
          <Hidden xsDown>
            {' '}
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
          </Hidden>
          .
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer
