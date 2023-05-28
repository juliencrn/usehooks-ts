import { styled } from '@mui/material'
import Container from '@mui/material/Container'
import Hidden from '@mui/material/Hidden'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import useSiteMetadata from '~/hooks/useSiteMetadata'

const Root = styled('footer')(({ theme }) => ({
  padding: theme.spacing(3, 0),
  marginTop: 'auto',
  backgroundColor: theme.palette.background.paper,
}))

function Footer() {
  const { author } = useSiteMetadata()

  return (
    <Root>
      <Container maxWidth="md">
        <Typography variant="body1" color="textSecondary" align="center">
          Made with{' '}
          <span role="img" aria-label="heart">
            ❤️
          </span>{' '}
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
            , built using{' '}
            <Link
              href="https://www.typescriptlang.org"
              color="inherit"
              target="_blank"
              rel="noreferrer"
            >
              Typescript
            </Link>{' '}
            and{' '}
            <Link
              href="https://www.gatsbyjs.org"
              color="inherit"
              target="_blank"
              rel="noreferrer"
            >
              Gatsby
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
          </Hidden>
        </Typography>
      </Container>
    </Root>
  )
}

export default Footer
