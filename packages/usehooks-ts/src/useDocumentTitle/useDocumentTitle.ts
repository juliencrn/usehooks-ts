import { useRef } from 'react'

import { useIsomorphicLayoutEffect } from '..'

export function useDocumentTitle(title: string, prevailOnUnmount = true): void {
  const defaultTitle = useRef(window.document.title)

  useIsomorphicLayoutEffect(() => {
    window.document.title = title
  }, [title])

  useIsomorphicLayoutEffect(() => () => {
    if (!prevailOnUnmount) {
      window.document.title = defaultTitle.current
    }
  })
}
