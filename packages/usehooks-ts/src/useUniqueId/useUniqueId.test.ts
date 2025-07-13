import { renderHook } from '@testing-library/react'

import { useUniqueId } from './useUniqueId'

describe('useUniqueId()', () => {
  const originalCrypto = globalThis.crypto

  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    Object.defineProperty(globalThis, 'crypto', {
      value: originalCrypto,
      configurable: true,
    })
    vi.restoreAllMocks()
  })

  it('returns a stable ID across renders', () => {
    const { result, rerender } = renderHook(() => useUniqueId())
    const first = result.current
    rerender()
    const second = result.current
    expect(first).toBe(second)
  })

  it('generates a unique ID per instance', () => {
    const first = renderHook(() => useUniqueId()).result.current
    const second = renderHook(() => useUniqueId()).result.current
    expect(first).not.toBe(second)
  })

  it('applies prefix correctly', () => {
    const { result } = renderHook(() => useUniqueId({ prefix: 'user-' }))
    expect(result.current.startsWith('user-')).toBe(true)
  })

  it('returns a UUID with dashes when withDashes is true', () => {
    const { result } = renderHook(() => useUniqueId({ withDashes: true }))
    const UUID_V4_REGEX =
      /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
    expect(result.current).toMatch(UUID_V4_REGEX)
  })

  it('returns a UUID without dashes by default', () => {
    const { result } = renderHook(() => useUniqueId())
    expect(result.current.length).toBe(32)
    expect(result.current.includes('-')).toBe(false)
  })

  it('respects the length option', () => {
    const { result } = renderHook(() => useUniqueId({ length: 10 }))
    expect(result.current.length).toBe(10)
  })

  it('handles length > 32 gracefully (no error)', () => {
    const { result } = renderHook(() => useUniqueId({ length: 100 }))
    expect(result.current.length).toBeGreaterThanOrEqual(32)
  })

  it('returns a fallback ID if crypto.randomUUID is missing', () => {
    const originalCrypto = globalThis.crypto

    const mockCrypto: Crypto = {
      ...originalCrypto,
      getRandomValues: originalCrypto.getRandomValues,
      // randomUUID is omitted to simulate unavailability
    }

    Object.defineProperty(globalThis, 'crypto', {
      value: mockCrypto,
      configurable: true,
      writable: true,
    })

    const { result } = renderHook(() => useUniqueId())
    expect(result.current.length).toBe(32)
    expect(result.current.includes('-')).toBe(false)

    // restore
    globalThis.crypto = originalCrypto
  })

  it('does not break when crypto.getRandomValues throws', () => {
    globalThis.crypto.getRandomValues = () => {
      throw new Error('blocked by CSP')
    }
    const { result } = renderHook(() => useUniqueId())
    expect(result.current.length).toBe(32)
  })
})
