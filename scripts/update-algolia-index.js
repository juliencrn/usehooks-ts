import { getHooks } from './utils/get-hooks.js'

import algoliasearch from 'algoliasearch'
import { env } from './env.js'

// Prepare the algolia records from the hooks
const records = getHooks().map(({ name, slug, summary }) => ({
  objectID: slug,
  name,
  summary,
}))

// Connect and authenticate with your Algolia app
const client = algoliasearch(env.ALGOLIA_APP_ID, env.ALGOLIA_ADMIN_KEY)

// Create a new index
const index = client.initIndex('hooks')

// Set the index settings
index.setSettings({
  camelCaseAttributes: ['name'],
  searchableAttributes: ['name', 'objectID', 'summary'],
  hitsPerPage: 1000,
})

// Add or update the records
index
  .saveObjects(records)
  .then(({ objectIDs }) => {
    console.log({ count: objectIDs.length, objectIDs })
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

// Include removed hooks
const removedHooks = [
  { objectID: 'use-debounce', name: 'useDebounce' },
  { objectID: 'use-fetch', name: 'useFetch' },
  { objectID: 'use-element-size', name: 'useElementSize' },
  { objectID: 'use-locked-body', name: 'useLockedBody' },
  { objectID: 'use-is-first-render', name: 'useIsFirstRender' },
  { objectID: 'use-ssr', name: 'useSsr' },
  { objectID: 'use-effect-once', name: 'useEffectOnce' },
  { objectID: 'use-update-effect', name: 'useUpdateEffect' },
  { objectID: 'use-image-on-load', name: 'useImageOnLoad' },
]

const removedIndex = client.initIndex('removed-hooks')

removedIndex.setSettings({
  camelCaseAttributes: ['name'],
  searchableAttributes: ['name', 'objectID'],
  hitsPerPage: 1000,
})

removedIndex
  .saveObjects(removedHooks)
  .then(({ objectIDs }) => {
    console.log({ count: objectIDs.length, objectIDs })
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
