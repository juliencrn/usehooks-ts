import { useState } from 'react'

import { useMediaQuery, useTheme } from '@mui/material'
import { useUpdateEffect } from 'usehooks-ts'

type ReturnType = [
  boolean,
  {
    openSidebar: () => void
    closeSidebar: () => void
  },
]

function useSidebar(): ReturnType {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('lg'))
  const [isOpen, setOpen] = useState(false)

  const closeSidebar = () => {
    if (isMobile) {
      setOpen(false)
    }
  }

  const openSidebar = () => setOpen(true)

  useUpdateEffect(() => {
    // Hide sidebar by default on small screen
    if (isMobile && isOpen) {
      closeSidebar()
    }

    // Show sidebar by default on large screen
    if (!isMobile && !isOpen) {
      openSidebar()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  return [
    isOpen,
    {
      openSidebar,
      closeSidebar,
    },
  ]
}

export default useSidebar
