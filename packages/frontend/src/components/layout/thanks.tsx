import React, { FC, useEffect, useState } from 'react'

import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles, Theme } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import Confetti from 'react-confetti'
import { useLocalStorage, useWindowSize } from 'usehooks-ts'

import { reduceLayoutWidth } from './styleUtils'

interface PropTypes {
  isSidebarOpened: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  snackbar: {
    flexDirection: 'column',

    ...reduceLayoutWidth(theme),

    '&::before': {
      content: '""',
      display: 'block',
      ...theme.mixins.toolbar,
    },
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
}))

const Thanks: FC<PropTypes> = props => {
  const classes = useStyles(props)
  const [viewedCount, setViewedCount] = useLocalStorage(
    '500-stars-viewed-count',
    0,
  )
  const [open, setOpen] = useState(viewedCount < 2)
  const { width, height } = useWindowSize()

  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (open) setViewedCount(viewedCount + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (viewedCount > 1) {
    return null
  }

  return (
    <>
      {open && <Confetti width={width} height={height} />}
      <Snackbar
        className={classes.snackbar}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        ContentProps={{
          message: `500+ Stargazers on useHooks.ts, thanks! 🎉`,
          className: classes.content,
        }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  )
}

export default Thanks
