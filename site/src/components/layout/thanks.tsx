import React, { useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import MuiSnackbar from '@mui/material/Snackbar'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/system'
import Confetti from 'react-confetti'
import { useLocalStorage, useWindowSize } from 'usehooks-ts'

const PREFIX = 'Thanks'

const classes = {
  snackbar: `${PREFIX}-snackbar`,
  content: `${PREFIX}-content`,
}

const Snackbar = styled(MuiSnackbar)(({ theme }) => ({
  flexDirection: 'column',

  '&::before': {
    content: '""',
    display: 'block',
    ...theme.mixins.toolbar,
  },

  [`& .${classes.content}`]: {
    backgroundColor: theme.palette.background.paper,
    backgroundImage: 'none',
    color: theme.palette.text.primary,
  },
}))

const Thanks = () => {
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
      {open && (
        <Box
          position="absolute"
          left="0"
          top="0"
          zIndex={1500}
          onClick={handleClose}
        >
          <Confetti width={width} height={height} />
        </Box>
      )}
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        ContentProps={{
          message: `500+ Stargazers on usehooks-ts, thanks! 🎉`,
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
