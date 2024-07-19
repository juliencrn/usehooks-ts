import { path, fs } from 'zx'

const readmeFile = path.resolve('./README.md')
const readmeUseHook = path.resolve('./packages/usehooks-ts/README.md')

export function updateReadme(hooks) {
  const data = fs
    .readFileSync(readmeFile, 'utf-8')
    .replace(
      /<!-- HOOKS:START -->(.*)<!-- HOOKS:END -->/gms,
      `<!-- HOOKS:START -->\n\n${hooks.map(formatHook).join('\n')}\n<!-- HOOKS:END -->`,
    )

  fs.writeFileSync(readmeFile, data, 'utf-8')
  fs.writeFileSync(readmeUseHook, data, 'utf-8')
}

// Utils

function formatHook(hook) {
  const trimmedSummary = hook.summary
    .replace(/^Custom hook that /, '')
    .replace(/`/g, '')
  return `- [\`${hook.name}\`](${hook.links.doc}) — ${trimmedSummary}`
}
