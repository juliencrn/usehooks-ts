import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

/**
 * A hook to set the document title.
 * @param {string} title - The title to set.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-document-title)
 * @example
 * useDocumentTitle('My new title');
 */
export function useDocumentTitle(title: string) {
  useIsomorphicLayoutEffect(() => {
    window.document.title = title
  }, [title])
}
