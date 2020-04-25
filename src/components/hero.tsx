import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme: Theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(12, 0, 10),
    marginBottom: theme.spacing(10),
  },
  title: {
    fontFamily: 'Fira Code',
  },
}))

export interface HeroProps {
  title: string
  description?: string
}

const Hero: FC<HeroProps> = ({ title, description = '', children }) => {
  const classes = useStyles()
  return (
    <div className={classes.heroContent}>
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
