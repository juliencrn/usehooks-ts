import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

/**
 * A hook to set the document title.
 * @param {string} title - The title to set.
 * @param {?boolean} [prevailOnUnmount] - Whether to keep the title after unmounting the component.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-document-title)
 * @example
 * useDocumentTitle('My new title');
 */
export function useDocumentTitle(title: string, prevailOnUnmount = true): void {
  useIsomorphicLayoutEffect(() => {
    window.document.title = title
  }, [title])

  useIsomorphicLayoutEffect(() => () => {
    if (!prevailOnUnmount) {
      window.document.title = defaultTitle.current
    }
  })
}
