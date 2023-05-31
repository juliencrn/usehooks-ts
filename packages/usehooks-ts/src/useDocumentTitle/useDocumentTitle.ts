import { useIsomorphicLayoutEffect } from '..'

export function useDocumentTitle(title: string): void {
  useIsomorphicLayoutEffect(() => {
    window.document.title = title
  }, [title])
}
