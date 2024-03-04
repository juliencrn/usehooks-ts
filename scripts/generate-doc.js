import { path, fs } from 'zx'

import { getHooks } from './utils/get-hooks.js'
import { generateDocFiles } from './utils/generate-doc-files.js'
import { updateReadme } from './utils/update-readme.js'

const generatedDir = path.resolve('./generated')

// Clean the generated directory
await $`rimraf ${generatedDir}/docs`
await $`rimraf ${generatedDir}/typedoc`

// Generate base from JSDoc comments using typedoc
await $`typedoc`

// Read hook list from the `generated/typedoc/all.json` file
const hooks = getHooks()

// Create the markdown files
fs.mkdirSync(path.join(generatedDir, 'docs'))
fs.mkdirSync(path.join(generatedDir, 'docs', 'hooks'))

for (const hook of hooks) {
  generateDocFiles(hook)
}

// Create the JSON file
fs.writeFileSync(
  path.join(generatedDir, 'docs', 'hooks.json'),
  JSON.stringify(hooks, null, 2),
)

// Update the README file
updateReadme(hooks)

// Format with Prettier
await $`pnpm format`
