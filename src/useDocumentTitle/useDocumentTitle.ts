import { useIsomorphicLayoutEffect } from '..'

function useDocumentTitle(title: string): void {
  useIsomorphicLayoutEffect(() => {
    window.document.title = title
  }, [title])
}

export default useDocumentTitle
