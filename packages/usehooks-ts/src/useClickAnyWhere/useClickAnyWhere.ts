import { useEventListener } from '..'

type Handler = (event: MouseEvent) => void

export function useClickAnyWhere(handler: Handler) {
  useEventListener('click', event => {
    handler(event)
  })
}
