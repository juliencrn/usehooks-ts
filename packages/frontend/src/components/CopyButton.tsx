import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import Tooltip from '@material-ui/core/Tooltip'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { useCopyToClipboard, useTimeout } from 'usehooks-ts'

const ThemedTooltip = withStyles(theme => ({
  tooltip: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.dracula.comment,
    boxShadow: theme.shadows[1],
  },
}))(Tooltip)

interface PropTypes {
  value: string
  classNames?: string
}

const CopyButton = ({ value, classNames }: PropTypes) => {
  const [, setCopiedText] = useCopyToClipboard()
  const [open, setOpen] = useState(false)

  // Auto close tooltip
  useTimeout(() => setOpen(false), open ? 2000 : null)

  const handleCopy = () => setCopiedText(value).then(() => setOpen(true))

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
