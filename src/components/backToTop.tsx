import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { Link } from 'react-scroll'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 1000,
      transition: `opacity 200ms`,
    },
  }),
)

const BackToTop: FC = () => {
  const classes = useStyles()
  const [isVisible, setVisible] = useState(false)

  useScrollPosition(
    ({ currPos }) => {
      const shouldBeVisible = currPos.y > 500
      if (isVisible !== shouldBeVisible) {
        setVisible(shouldBeVisible)
      }
    },
    undefined,
    undefined,
    true,
    200,
  )

  return (
    <Link
      to="___gatsby"
      smooth
      isDynamic
      className={classes.root}
      style={{ opacity: Number(isVisible) }}
    >
      <Fab color="primary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </Link>
  )
}

export default BackToTop
