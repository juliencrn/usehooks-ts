import React, { useState, useRef, FC, useEffect } from 'react'
import {
  InstantSearch,
  Index,
  connectStateResults,
  connectSearchBox,
  Configure,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import { Theme, makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'

import Input from './input'
import { PoweredBy, ConnectedHits } from './hitComps'
import { useOnClickOutside } from '../../hooks'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID || '',
  process.env.GATSBY_ALGOLIA_SEARCH_KEY || '',
)

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }: any) => {
    return res && res.nbHits > 0 ? (
      children
    ) : (
      <Box p={2}>
        <Typography variant="body1">
          {`No results for "${state.query}"`}
        </Typography>
      </Box>
    )
  },
)

const SearchBar = connectSearchBox(({ currentRefinement, refine }) => (
  <Input value={currentRefinement} refine={refine} />
))

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
    },
  },
  modal: {
    width: '100%',
    height: 'auto',
    position: 'absolute',
    top: 'calc(100% + 0.5em)',
    zIndex: 100,
    right: 0,
    [theme.breakpoints.up('sm')]: {
      width: 440,
    },
    [theme.breakpoints.up('md')]: {
      width: 500,
    },
    display: (props: { open: boolean }) => (props.open ? 'block' : 'none'),
  },
  title: {
    padding: theme.spacing(2, 2, 1),
  },
}))

const Search: FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState<string>('')
  const [open, setOpen] = useState<boolean>(!!query)
  const classes = useStyles({ open })

  const handleSearchClick = () => setOpen(!!query)

  useOnClickOutside(ref, () => setOpen(false))

  useEffect(() => setOpen(!!query), [query])

  return (
    <div ref={ref} className={classes.root}>
      <InstantSearch
        indexName="Posts"
        searchClient={searchClient}
        onSearchStateChange={({ query: q }) => setQuery(q)}
      >
        <Configure hitsPerPage={4} />

        <Box onClick={handleSearchClick}>
          <SearchBar />
        </Box>

        <Paper className={classes.modal}>
          <Index indexName="Posts">
            <Typography variant="h5" className={classes.title}>
              Hooks
            </Typography>
            <Divider />
            <Results>
              <ConnectedHits />
            </Results>
          </Index>

          <PoweredBy />
        </Paper>
      </InstantSearch>
    </div>
  )
}

export default Search
