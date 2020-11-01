import { useRef, useEffect, useState } from 'react'

type Args = IntersectionObserverInit & { freezeOnceVisible?: boolean }
type Return<T> = [(node: T) => void, IntersectionObserverEntry?]

function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = false,
}: Args): Return<T> {
  const observer = useRef<IntersectionObserver | null>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [node, setNode] = useState<T>() // DOM Ref

  const isClient = typeof window !== `undefined`
  const hasIOSupport = isClient && !!window.IntersectionObserver
  const noUpdate = entry?.isIntersecting && freezeOnceVisible
  const IOOptions = { threshold, root, rootMargin }

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  useEffect(() => {
    if (!hasIOSupport || noUpdate || typeof node === `undefined`) {
      return
    }

    // Delete the old observer before creating a new one
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(updateEntry, IOOptions)

    // Ensure the rest of useEffect use the same observer
    const { current: currentObserver } = observer

    currentObserver.observe(node)

    return () => {
      currentObserver.disconnect()
    }
  }, [node, threshold, root, rootMargin, noUpdate])

  return [setNode, entry]
}

export default useIntersectionObserver
