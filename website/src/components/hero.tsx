import React, { FC } from 'react'

import { styled } from '@mui/material'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'

const Root = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(12, 0, 10),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}))

export interface HeroProps {
  title: string
  description?: string
  fullHeight?: boolean
}

const Hero: FC<HeroProps> = ({
  title,
  description = '',
  fullHeight,
  children,
}) => {
  return (
    <Root mb={fullHeight ? 0 : 10} flexGrow={fullHeight ? 1 : 0}>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          color="textPrimary"
          sx={{ fontFamily: 'Fira Code, monospace' }}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          {description}
        </Typography>

        {children}
      </Container>
    </Root>
  )
}

export default Hero
