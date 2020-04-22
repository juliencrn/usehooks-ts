import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme: Theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    marginBottom: theme.spacing(4),
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
      <Container maxWidth="sm">
        <Typography
          variant="h1"
          align="center"
          color="textPrimary"
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
