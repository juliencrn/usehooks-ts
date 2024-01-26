import { useEventListener } from '../useEventListener'

/**
 * Custom hook for handling click events anywhere on the document.
 * @param {Function} handler - The function to be called when a click event is detected anywhere on the document.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-click-any-where)
 * @example
 * // Usage of useClickAnywhere hook
 * const handleClick = (event) => {
 *   console.log('Document clicked!', event);
 * };
 *
 * // Attach click event handler to document
 * useClickAnywhere(handleClick);
 */
export function useClickAnyWhere(handler: (event: MouseEvent) => void) {
  useEventListener('click', event => {
    handler(event)
  })
}
