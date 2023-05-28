import { FC } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import MuiInputBase, { InputBaseProps } from '@mui/material/InputBase'
import { styled } from '@mui/material/styles'

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0),
}))

const IconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const InputBase = styled(MuiInputBase)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1, 1, 1, 0),
  color: 'inherit',
}))

export interface InputProps extends InputBaseProps {
  refine?: (key: string) => void
}

const Input: FC<InputProps> = ({ refine, ...rest }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (refine) {
      refine(event.target.value)
    }
  }

  return (
    <Form>
      <IconWrapper>
        <SearchIcon />
      </IconWrapper>
      <InputBase
        placeholder="Search…"
        size="medium"
        sx={{ fontSize: 'subtitle' }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
        {...rest}
      />
    </Form>
  )
}

export default Input
