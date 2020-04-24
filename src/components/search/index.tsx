import React, { useState, useRef, FC } from 'react'
import {
  InstantSearch,
  Index,
  Hits,
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
import { PostHit, PoweredBy } from './hitComps'
import useOnClickOutside from '../../hooks/useOnClickOustide'

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
  modal: {
    width: 480,
    height: 'auto',
    marginRight: theme.spacing(2),
    position: 'absolute',
    top: 'calc(100% + 0.5em)',
    zIndex: 100,
    right: 0,
    left: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
    '& ul': {
      padding: theme.spacing(0, 2),
      maxHeight: 480,
      overflowY: 'auto',
    },
    '& li': {
      listStyle: 'none',
    },
  },
  title: {
    padding: theme.spacing(2, 2, 1),
  },
}))

const Search: FC = () => {
  const classes = useStyles()
  const ref = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')

  useOnClickOutside(ref, () => setQuery(''))

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <InstantSearch
        indexName="Posts"
        searchClient={searchClient}
        onSearchStateChange={({ query: q }) => setQuery(q)}
      >
        <Configure hitsPerPage={4} />
        <SearchBar />

        <Paper
          className={classes.modal}
          style={{ display: query ? 'block' : 'none' }}
        >
          <Index indexName="Posts">
            <Typography variant="h5" className={classes.title}>
              Hooks
            </Typography>
            <Divider />
            <Results>
              <Hits hitComponent={PostHit(() => setQuery(''))} />
            </Results>
          </Index>

          <Box pb={1} pr={2}>
            <PoweredBy />
          </Box>
        </Paper>
      </InstantSearch>
    </div>
  )
}

export default Search
