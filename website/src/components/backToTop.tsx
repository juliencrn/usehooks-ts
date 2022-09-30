import { FC, useState } from 'react'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { styled } from '@mui/material'
import Fab from '@mui/material/Fab'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { Link } from 'react-scroll'

const StyledLink = styled(Link)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 1000,
  transition: `opacity 200ms`,
}))

const BackToTop: FC = () => {
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
    <StyledLink
      to="___gatsby"
      smooth
      isDynamic
      style={{ opacity: Number(isVisible) }}
    >
      <Fab color="primary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </StyledLink>
  )
}

export default BackToTop
