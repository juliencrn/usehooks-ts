import React, { useState } from 'react'
import { Theme, withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { useTimeout } from '~/hooks'

const ThemedTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    color: theme.palette.common.white,
    backgroundColor: theme.dracula.comment,
    boxShadow: theme.shadows[1],
  },
}))(Tooltip)

const copy = async (text: string): Promise<true | undefined> => {
  if (typeof navigator === 'undefined') return
  if (!navigator.clipboard) return

  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('copy failed', error)
    return
  }
}

interface PropTypes {
  value: string
  classNames?: string
}

const CopyButton = ({ value, classNames }: PropTypes) => {
  const [open, setOpen] = useState(false)

  // Auto close tooltip
  useTimeout(() => setOpen(false), open ? 2000 : null)

  const handleCopy = async () => {
    const copied = await copy(value)
    if (copied) setOpen(true)
  }

  return (
    <ThemedTooltip
      PopperProps={{
        disablePortal: true,
      }}
      open={open}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      title="Copied!"
    >
      <Button
        className={classNames}
        onClick={handleCopy}
        size="small"
        startIcon={<FileCopyIcon />}
      >
        Copy
      </Button>
    </ThemedTooltip>
  )
}

export default CopyButton
