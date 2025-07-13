import { useId, useRef } from 'react'

// Constants
const UUID_TEMPLATE = '10000000100040008000100000000000'
const BYTE_ARRAY_SIZE = 1
const BYTE_MAX = 256
const UUID_REPLACE_REGEX = /[018]/g
const DASH_REGEX = /-/g
const HEX_RADIX = 16
const BIT_MASK = 15
const VERSION_SHIFT_DIVISOR = 4

type UseUniqueIdOptions = {
  prefix?: string
  withDashes?: boolean
  length?: number // Truncate if needed (e.g. 10 for nano-style)
}

/**
 * Generates a cryptographically secure UUID (Universally Unique Identifier) v4–like string (32-character hex, no dashes).
 * @returns {string} A 32-character lowercase hexadecimal UUID string (dashless).
 */

function generateSecureUUID(): string {
  const cryptoObj =
    typeof globalThis !== 'undefined' ? globalThis.crypto : undefined

  try {
    // Use native crypto.randomUUID if available (modern browsers)
    if (cryptoObj?.randomUUID) {
      return cryptoObj.randomUUID().replace(DASH_REGEX, '')
    }

    // Use getRandomValues fallback if available
    const getRandomByte = cryptoObj?.getRandomValues
      ? () => {
          const arr = new Uint8Array(BYTE_ARRAY_SIZE)
          cryptoObj.getRandomValues(arr)
          return arr[0]
        }
      : () => Math.floor(Math.random() * BYTE_MAX)

    return UUID_TEMPLATE.replace(UUID_REPLACE_REGEX, (char: string) => {
      const digit = Number(char)
      const rand = getRandomByte() & BIT_MASK
      const shifted = rand >> (digit / VERSION_SHIFT_DIVISOR)
      return (digit ^ shifted).toString(HEX_RADIX)
    })
  } catch {
    // Final fallback if crypto access fails (e.g., iframe security, CSP)
    return UUID_TEMPLATE.replace(UUID_REPLACE_REGEX, (char: string) => {
      const digit = Number(char)
      const rand = Math.floor(Math.random() * BYTE_MAX) & BIT_MASK
      const shifted = rand >> (digit / VERSION_SHIFT_DIVISOR)
      return (digit ^ shifted).toString(HEX_RADIX)
    })
  }
}

/**
 * UseUniqueId - A flexible, SSR-safe, secure hook for generating stable unique IDs.
 * @param options - Optional config:
 * - prefix: prepend to the ID
 * - withDashes: return standard UUID format
 * - length: truncate the ID to desired length.
 * @returns Stable unique ID (string).
 * @example
 */
export function useUniqueId(options?: UseUniqueIdOptions): string {
  const { prefix = '', withDashes = false, length } = options || {}
  const reactId = useId() // SSR-safe ID base
  const idRef = useRef<string>()

  if (!idRef.current) {
    let baseId: string

    if (typeof window === 'undefined') {
      // On server, use React-generated ID
      baseId = reactId.replace(/[:]/g, '')
    } else {
      baseId = generateSecureUUID()
    }

    if (
      withDashes &&
      typeof window !== 'undefined' &&
      globalThis.crypto?.randomUUID
    ) {
      baseId = globalThis.crypto.randomUUID() // Full dashed format
    }

    if (length) {
      baseId = baseId.slice(0, length)
    }

    idRef.current = `${prefix}${baseId}`
  }

  return idRef.current
}
