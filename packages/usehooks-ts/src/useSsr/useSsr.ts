/**
 * @deprecated useSsr isn't a valid react hook and will be dropped in the next major release. See #258
 * @returns {{ isBrowser: boolean, isServer: boolean }} An object containing the boolean values `isBrowser` and `isServer`.
 * @example
 * const { isBrowser, isServer } = useSsr();
 */
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
