/** @deprecated useSsr isn't a valid react hook and will be dropped in the next major release. See #258 */
export function useSsr() {
  const isDOM =
    typeof window !== 'undefined' &&
    window.document &&
    window.document.documentElement

  return {
    isBrowser: isDOM,
    isServer: !isDOM,
  }
}
