'use client'

import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch'

import { CommandMenu } from './command-menu'
import { CommandMenuProvider } from './modal.context'
import { OpenButton } from './open-button'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY ?? '',
)

export const DocSearch = () => {
  return (
    <CommandMenuProvider>
      <OpenButton />
      <InstantSearch searchClient={searchClient} indexName="hooks">
        <CommandMenu />
      </InstantSearch>
    </CommandMenuProvider>
  )
}
