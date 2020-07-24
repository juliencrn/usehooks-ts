import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

export interface HeroProps {
  title: string
  description?: string
  fullHeight?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(12, 0, 10),
    marginBottom: theme.spacing(10),
  },
  fullHeight: {
    flex: 1,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Fira Code, monospace',
  },
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
  const classes = useStyles()
  return (
    <div
      className={`${classes.heroContent} ${fullHeight && classes.fullHeight}`}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          color="textPrimary"
          className={classes.title}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          {description}
        </Typography>
        {children}
      </Container>
    </div>
  )
}

export default Hero
