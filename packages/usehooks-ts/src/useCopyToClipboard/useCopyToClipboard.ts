import { useCallback, useState } from 'react'

/**
 * The copied text as `string` or `null` if nothing has been copied yet.
 */
type CopiedValue = string | null

/**
 * Options for the copy function.
 */
type CopyOptions = {
  /**
   * Callback function called when the copy operation succeeds.
   * @param data - An object containing the copied text.
   */
  onSuccess?: (data: { text: string }) => void
  /**
   * Callback function called when the copy operation fails.
   * @param data - An object containing the error and the text that failed to copy.
   */
  onError?: (data: { error: Error; text: string }) => void
}

/**
 * Function to copy text to the clipboard.
 * @param text - The text to copy to the clipboard.
 * @param options - Optional callbacks for success and error handling.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the text was copied successfully, or `false` otherwise.
 */
type CopyFn = (text: string, options?: CopyOptions) => Promise<boolean>

/**
 * Custom hook that copies text to the clipboard using the [`Clipboard API`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).
 * @returns {[CopiedValue, CopyFn]} An tuple containing the copied text and a function to copy text to the clipboard.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-copy-to-clipboard)
 * @example
 * ```tsx
 * const [copiedText, copyToClipboard] = useCopyToClipboard();
 * const textToCopy = 'Hello, world!';
 *
 * // Using callbacks (recommended)
 * copyToClipboard(textToCopy, {
 *   onSuccess: ({ text }) => {
 *     console.log(`Text "${text}" copied to clipboard successfully.`);
 *   },
 *   onError: ({ error, text }) => {
 *     console.error(`Failed to copy "${text}":`, error);
 *   }
 * });
 *
 * // Using promises (backward compatible)
 * copyToClipboard(textToCopy)
 *   .then(success => {
 *     if (success) {
 *       console.log(`Text "${textToCopy}" copied to clipboard successfully.`);
 *     } else {
 *       console.error('Failed to copy text to clipboard.');
 *     }
 *   });
 * ```
 */
export function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = useCallback(async (text, options) => {
    if (!navigator?.clipboard) {
      const error = new Error('Clipboard not supported')
      console.warn('Clipboard not supported')

      if (options?.onError) {
        options.onError({ error, text })
      }

      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)

      if (options?.onSuccess) {
        options.onSuccess({ text })
      }

      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)

      const errorObj = error instanceof Error ? error : new Error(String(error))

      if (options?.onError) {
        options.onError({ error: errorObj, text })
      }

      return false
    }
  }, [])

  return [copiedText, copy]
}
