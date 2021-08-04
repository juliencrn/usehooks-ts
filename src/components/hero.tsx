import React, { FC } from 'react'

import Container from '@material-ui/core/Container'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

export interface HeroProps {
  title: string
  description?: string
  fullHeight?: boolean
}

interface StyleProps {
  fullHeight: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  hero: (props: StyleProps) => ({
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(12, 0, 10),
    marginBottom: props.fullHeight ? 0 : theme.spacing(10),
    flexGrow: props.fullHeight ? 1 : 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }),
  container: {
    marginTop: theme.spacing(-8),
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
  const classes = useStyles({ fullHeight: !!fullHeight })
  return (
    <div className={classes.hero}>
      <Container maxWidth="md" className={classes.container}>
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
