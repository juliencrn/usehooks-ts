import { useState } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Modal from '@mui/material/Modal'
import MuiPaper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import algoliasearch from 'algoliasearch'
import {
  Configure,
  connectSearchBox,
  connectStateResults,
  Index,
  InstantSearch,
} from 'react-instantsearch-dom'

import { ConnectedHits, PoweredBy } from './hitComps'
import Input from './input'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID || '',
  process.env.GATSBY_ALGOLIA_SEARCH_KEY || '',
)

const Paper = styled(MuiPaper)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  border: '0.2px solid',
  borderColor:
    theme.palette.mode === 'light'
      ? theme.palette.common.black
      : theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  display: 'flex',
  backgroundImage: 'none',

  [theme.breakpoints.up('sm')]: {
    top: '10%',
    height: '70%',
  },
}))

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

const ModalContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflow: 'hidden',
}))

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [, setQuery] = useState<string>('')

  return (
    <Modal open={open} onClose={onClose}>
      <Paper>
        <InstantSearch
          indexName="Posts"
          searchClient={searchClient}
          onSearchStateChange={({ query: q }) => setQuery(q)}
        >
          <Configure hitsPerPage={8} />
          <ModalContent>
            <SearchBar />
            <Divider />
            <Box overflow="auto" flex={1}>
              <Index indexName="Posts">
                <Results>
                  <ConnectedHits />
                </Results>
              </Index>
            </Box>
            <Divider />
            <PoweredBy />
          </ModalContent>
        </InstantSearch>
      </Paper>
    </Modal>
  )
}

const SearchBar = connectSearchBox(({ currentRefinement, refine }) => (
  // eslint-disable-next-line jsx-a11y/no-autofocus
  <Input value={currentRefinement} refine={refine} autoFocus={true} />
))

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) => {
    return res && res.nbHits > 0 ? (
      <>{children}</>
    ) : (
      <Box p={2}>
        <Typography variant="body1" align="center">
          {`No results for "${state.query ?? ''}"`}
        </Typography>
      </Box>
    )
  },
)
