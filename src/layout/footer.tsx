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
  const { author, social } = useSiteMetadata()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Typography variant="body1" color="textSecondary">
          © {new Date().getFullYear()}, Built with
          {` `}
          <Link href="https://www.gatsbyjs.org" target="_blank">
            Gatsby
          </Link>
          ,{` `}
          <Link href="https://www.typescriptlang.org" target="_blank">
            Typescript
          </Link>{' '}
          and
          {` `}
          <Link href="https://material-ui.com/" target="_blank">
            @Material-ui
          </Link>
          , written by
          {` `}
          <Link href={social.github} target="_blank">
            {author.name}
          </Link>{' '}
          and hosted on
          {` `}
          <Link href="https://www.netlify.com/" target="_blank">
            Netlify
          </Link>
          .
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer
