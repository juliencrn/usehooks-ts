import { useEventListener } from 'usehooks-ts'

export function useCmdK(callback: () => void) {
  useEventListener('keydown', event => {
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      callback()
    }
  })
}
