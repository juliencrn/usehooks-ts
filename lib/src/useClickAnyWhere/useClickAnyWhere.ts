import { useEventListener } from '../useEventListener'

export type Handler = (event: MouseEvent) => void

function useClickAnyWhere(handler: Handler) {
  useEventListener('click', event => {
    handler(event)
  })
}

export default useClickAnyWhere
