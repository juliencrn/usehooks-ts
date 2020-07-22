import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Highlight, connectHits } from 'react-instantsearch-dom'
import { Theme, makeStyles, fade } from '@material-ui/core/styles'

import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    maxHeight: 500,
    overflowY: 'auto',
    padding: 0,
  },
  hit: {
    paddingTop: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'start',
    '& em': {
      fontStyle: 'normal',
      background: fade(theme.palette.primary.main, 0.3),
    },
  },
  title: {
    fontFamily: 'Fira Code, Monaco, monospace',
    marginBottom: theme.spacing(1),
    display: 'block',
  },
  powered: {
    fontSize: '0.9em',
    textAlign: 'end',
    padding: theme.spacing(1, 2, 1),
  },
}))

const Algolia = () => (
  <svg
    aria-hidden="true"
    width="0.88em"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 448 512"
  >
    <path
      d="M229.3 182.6c-49.3 0-89.2 39.9-89.2 89.2c0 49.3 39.9 89.2 89.2 89.2s89.2-39.9 89.2-89.2c0-49.3-40-89.2-89.2-89.2zm62.7 56.6l-58.9 30.6c-1.8.9-3.8-.4-3.8-2.3V201c0-1.5 1.3-2.7 2.7-2.6c26.2 1 48.9 15.7 61.1 37.1c.7 1.3.2 3-1.1 3.7zM389.1 32H58.9C26.4 32 0 58.4 0 90.9V421c0 32.6 26.4 59 58.9 59H389c32.6 0 58.9-26.4 58.9-58.9V90.9C448 58.4 421.6 32 389.1 32zm-202.6 84.7c0-10.8 8.7-19.5 19.5-19.5h45.3c10.8 0 19.5 8.7 19.5 19.5v15.4c0 1.8-1.7 3-3.3 2.5c-12.3-3.4-25.1-5.1-38.1-5.1c-13.5 0-26.7 1.8-39.4 5.5c-1.7.5-3.4-.8-3.4-2.5v-15.8zm-84.4 37l9.2-9.2c7.6-7.6 19.9-7.6 27.5 0l7.7 7.7c1.1 1.1 1 3-.3 4c-6.2 4.5-12.1 9.4-17.6 14.9c-5.4 5.4-10.4 11.3-14.8 17.4c-1 1.3-2.9 1.5-4 .3l-7.7-7.7c-7.6-7.5-7.6-19.8 0-27.4zm127.2 244.8c-70 0-126.6-56.7-126.6-126.6s56.7-126.6 126.6-126.6c70 0 126.6 56.6 126.6 126.6c0 69.8-56.7 126.6-126.6 126.6z"
      fill="#5568FF"
    />
    <rect x="0" y="0" width="448" height="512" fill="rgba(0, 0, 0, 0)" />
  </svg>
)

export const PoweredBy = () => {
  const classes = useStyles()
  return (
    <Typography variant="body2" className={classes.powered}>
      Powered by{` `}
      <Link href="https://algolia.com" target="_blank">
        <Algolia /> Algolia
      </Link>
    </Typography>
  )
}

export const ConnectedHits = connectHits(({ hits }) => {
  const classes = useStyles()
  return (
    <List className={classes.list}>
      {hits.map(hit => (
        <ListItem
          button
          key={hit.objectID}
          component={GatsbyLink}
          to={hit.path}
          className={classes.hit}
        >
          <Typography className={classes.title} variant="h6" component="span">
            <Highlight attribute="title" hit={hit} />
            ()
          </Typography>
          <Typography variant="body2" color="textSecondary" component="span">
            <Highlight attribute="excerpt" hit={hit} />
          </Typography>
        </ListItem>
      ))}
    </List>
  )
})
