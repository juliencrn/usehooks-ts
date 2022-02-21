import fs from 'fs'
import path from 'path'

import { isHookFile } from './utils'

const hookDir = path.resolve('./lib/src')
const hooks = fs.readdirSync(hookDir).filter(isHookFile)
const testFileRegex = new RegExp(`\.test\.ts$`)
let hasTestCount = 0

console.log(`Hook with unit tests: \n`)

for (const filename of hooks) {
  const subFiles = fs.readdirSync(path.resolve(hookDir, filename))
  const hasTest = !!subFiles.find(name => testFileRegex.test(name))

  if (hasTest) {
    hasTestCount += 1
    console.log(`- [x] ${filename}`)
  } else {
    console.log(`- [ ] ${filename}`)
  }
}

const percentage = ((hasTestCount / hooks.length) * 100).toFixed(2)

console.log(`\nTested hooks: ${hasTestCount}/${hooks.length} (${percentage}%)`)
