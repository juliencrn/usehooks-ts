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
