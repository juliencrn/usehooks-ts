import { useEffect } from 'react'

type AnyEvent = MouseEvent | TouchEvent
type Handler = (event: AnyEvent) => void

function useClickAnyWhere(handler: Handler) {
  useEffect(() => {
    const callback = (event: AnyEvent) => handler(event)

    document.addEventListener('click', callback)
    return () => document.removeEventListener('click', callback)
  }, [handler])
}

export default useClickAnyWhere
