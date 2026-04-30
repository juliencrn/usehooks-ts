# Testing, Migration, And Pitfalls

Use this file when adding tests, reviewing existing usage, or migrating old code.

## Testing Hooks And Components

Use the app's existing test runner. With Testing Library:

```tsx
import { act, renderHook } from '@testing-library/react'
import { useBoolean } from 'usehooks-ts'

it('toggles', () => {
  const { result } = renderHook(() => useBoolean(false))

  act(() => {
    result.current.toggle()
  })

  expect(result.current.value).toBe(true)
})
```

Use fake timers for timer and debounce hooks:

```tsx
vi.useFakeTimers()

const callback = vi.fn()
renderHook(() => useTimeout(callback, 500))

act(() => {
  vi.advanceTimersByTime(500)
})

expect(callback).toHaveBeenCalled()
```

Always restore timers after the test if the project setup does not do it globally.

## Browser API Mocks

Mock `matchMedia` for `useMediaQuery`, `useDarkMode`, and `useTernaryDarkMode`:

```tsx
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
```

Mock storage when jsdom behavior is insufficient or when isolation matters:

```tsx
window.localStorage.clear()
```

Mock observers for `useResizeObserver` and `useIntersectionObserver`:

```tsx
class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

window.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver
```

Mock clipboard:

```tsx
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
})
```

## Common Pitfalls

- Missing `'use client'` in Next.js App Router files that call hooks.
- Rendering viewport, media query, storage, or screen values on the server without `initializeWithValue: false`.
- Assuming JSON serialization preserves `Date`, `Map`, `Set`, class instances, functions, or `undefined` in nested structures.
- Using `useWindowSize` for style-only responsive UI that CSS can handle better.
- Using `useOnClickOutside` when the target ref can be `null` forever; ensure the element actually receives the ref.
- Forgetting that clipboard and external script behavior can fail because of browser policy, network, CSP, or secure-context requirements.
- Recreating listener options objects inline in hot paths when it causes unnecessary add/remove cycles.
- Using old removed hooks from v2 examples.

## Migration Replacements

Use these replacements when old code or blog examples mention removed hooks:

```tsx
// old: useDebounce(value, delay)
const [debouncedValue] = useDebounceValue(value, delay)

// old: useDebounce(callback, delay)
const debouncedCallback = useDebounceCallback(callback, delay)
```

```tsx
// old: useElementSize(ref)
const size = useResizeObserver({ ref })
```

```tsx
// old: useLockedBody()
const { lock, unlock, isLocked } = useScrollLock()
```

For old `useFetch`, choose a project-native data layer instead of rebuilding it with hooks:

- Next.js Server Components or route handlers
- Remix loaders and actions
- SWR
- TanStack Query
- Apollo, Relay, urql, or the app's existing GraphQL/data client

## Review Checklist

- The package is imported from `usehooks-ts` as named exports.
- The file is a Client Component when using Next.js App Router.
- SSR-sensitive hooks use deterministic first-render options when needed.
- Storage keys are stable and scoped correctly.
- Non-JSON values have custom serialization.
- Timer, debounce, observer, and event behavior has focused tests when business-critical.
- Accessibility behavior still exists around interactive UI: focus management, Escape key, ARIA roles, keyboard access, and reduced-motion expectations where relevant.
