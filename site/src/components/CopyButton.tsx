import React, { useState } from 'react'

import FileCopyIcon from '@mui/icons-material/FileCopy'
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { useCopyToClipboard, useTimeout } from 'usehooks-ts'

interface PropTypes {
  value: string
  classNames?: string
  hideText?: boolean
}

const CopyButton = ({ value, classNames, hideText }: PropTypes) => {
  const [, setCopiedText] = useCopyToClipboard()
  const [open, setOpen] = useState(false)

  // Auto close tooltip
  useTimeout(() => setOpen(false), open ? 2000 : null)

  const handleCopy = () => setCopiedText(value).then(() => setOpen(true))

  return (
    <Tooltip
      PopperProps={{
        disablePortal: true,
      }}
      open={open}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      title="Copied!"
    >
      {hideText ? (
        <IconButton
          aria-label="Copy"
          color="inherit"
          onClick={handleCopy}
          size="small"
          className={classNames}
        >
          <FileCopyIcon fontSize="small" />
        </IconButton>
      ) : (
        <Button
          color="inherit"
          onClick={handleCopy}
          size="small"
          startIcon={<FileCopyIcon />}
          className={classNames}
        >
          Copy
        </Button>
      )}
    </Tooltip>
  )
}

export default CopyButton
