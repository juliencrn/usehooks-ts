# Hook Catalog

Use this file when selecting a hook or checking return shapes. Target the v3 API represented by this repository. If the user asks for the latest npm version, verify against the project's lockfile or npm before relying on exact version claims.

## Selection Table

| Hook | Use for | API notes |
| --- | --- | --- |
| `useBoolean` | Boolean state plus `setTrue`, `setFalse`, `toggle` helpers. | Returns `{ value, setValue, setTrue, setFalse, toggle }`. Throws if the default value is not boolean. |
| `useClickAnyWhere` | Handling document-wide click events. | Use for global click behavior, not outside-click detection. |
| `useCopyToClipboard` | Copying text with the Clipboard API. | Returns copied value state and a copy function. Must run in a browser and may fail without permissions or secure context. |
| `useCountdown` | Start, stop, reset countdown or count-up behavior. | Returns `[count, { startCountdown, stopCountdown, resetCountdown }]`. Uses `useInterval`. |
| `useCounter` | Numeric counter state. | Returns `{ count, increment, decrement, reset, setCount }`. |
| `useDarkMode` | Boolean dark mode preference backed by local storage and OS preference. | Returns `{ isDarkMode, toggle, enable, disable, set }`. Use `initializeWithValue: false` in SSR-sensitive components. |
| `useDebounceCallback` | Debouncing a callback or side effect. | Returns a debounced function with `cancel`, `flush`, and `isPending`. Depends on `lodash.debounce`. |
| `useDebounceValue` | Debouncing a changing value. | Returns `[debouncedValue, updateDebouncedValue]`. Supports `equalityFn`. |
| `useDocumentTitle` | Setting `document.title`. | Use only in client-rendered components. Check options for reset-on-unmount behavior in codebase docs if needed. |
| `useEventCallback` | Stable event callbacks without stale closures. | Use inside custom hooks or event/timer work. Do not call the returned handler during render. |
| `useEventListener` | Window, document, element, SVG, or `MediaQueryList` event listeners. | Saves latest handler in a ref. Pass a ref for non-window targets. |
| `useHover` | Hover state for an element ref. | Use when CSS hover is insufficient because React state must change. |
| `useIntersectionObserver` | Observing visibility in viewport or a root. | Returns tuple and object fields: `[ref, isIntersecting, entry]` plus `.ref`, `.isIntersecting`, `.entry`. |
| `useInterval` | Intervals with fresh callback semantics. | Pass `null` delay to stop. `0` is valid. |
| `useIsClient` | Knowing whether code has reached the client. | Helpful for conditional rendering after hydration. |
| `useIsMounted` | Checking mounted status from async callbacks. | Returns a function, usually called before setting state after async work. |
| `useIsomorphicLayoutEffect` | `useLayoutEffect` on client and `useEffect` on server. | Use inside hooks that need layout behavior without SSR warnings. |
| `useLocalStorage` | Persistent state in `localStorage`. | Returns `[value, setValue, removeValue]`. Supports custom serializer/deserializer and `initializeWithValue`. |
| `useMap` | React state around a `Map`. | Use when callers need `set`, `remove`, `reset`, or map-like state updates. |
| `useMediaQuery` | Match media query state. | Options: `defaultValue`, `initializeWithValue`. Uses legacy `addListener` fallback for older Safari. |
| `useOnClickOutside` | Dismiss popovers, menus, dialogs when clicking outside one or more refs. | Supports mouse, touch, focus events, and listener options. |
| `useReadLocalStorage` | Read-only subscription to a `localStorage` key. | Use when a component should react to storage changes but not write. |
| `useResizeObserver` | Observing element size changes. | Pass `{ ref, box, onResize }`. If `onResize` is set, the hook does not rerender for size changes. |
| `useScreen` | Tracking `window.screen` dimensions and properties. | SSR-sensitive. Prefer `initializeWithValue: false` when server rendered. |
| `useScript` | Loading an external script and tracking status. | Returns `idle`, `loading`, `ready`, or `error`. Mounts scripts in `document.body`. |
| `useScrollLock` | Locking page or element scroll, usually for overlays. | Returns `{ isLocked, lock, unlock }`. Defaults to auto-locking `document.body`. |
| `useSessionStorage` | Persistent state in `sessionStorage`. | Same shape as `useLocalStorage`: `[value, setValue, removeValue]`. |
| `useStep` | Multi-step workflows. | Use for bounded step navigation. Check max step behavior in the hook before assuming wraparound. |
| `useTernaryDarkMode` | `system`, `dark`, `light` theme mode. | Returns `{ isDarkMode, ternaryDarkMode, setTernaryDarkMode, toggleTernaryDarkMode }`. |
| `useTimeout` | Timeouts with fresh callback semantics. | Pass `null` delay to stop. |
| `useToggle` | Boolean toggle state. | Simpler than `useBoolean`; use when only value and toggling are needed. |
| `useUnmount` | Running cleanup when component unmounts. | Often used to cancel pending debounced callbacks or subscriptions. |
| `useWindowSize` | Tracking viewport width and height. | Options include `initializeWithValue` and `debounceDelay`. |

## Removed v2 Hooks And Replacements

- `useDebounce`: use `useDebounceValue` for debounced state or `useDebounceCallback` for debounced functions.
- `useElementSize`: use `useResizeObserver`.
- `useLockedBody`: use `useScrollLock`.
- `useFetch`: use framework data fetching, Server Components, loaders, SWR, React Query, or another cache-aware approach.
- `useIsFirstRender`: avoid. Prefer explicit state/effect logic.
- `useSsr`: avoid. It was not a hook.
- `useEffectOnce` and `useUpdateEffect`: prefer built-in React effects with clear dependencies.
- `useImageOnLoad`: avoid or implement app-specific image behavior.

## Import Guidance

Use package-root named imports:

```tsx
import { useBoolean, useLocalStorage } from 'usehooks-ts'
```

Avoid these patterns:

```tsx
import useBoolean from 'usehooks-ts'
import { useBoolean } from 'usehooks-ts/dist/useBoolean'
```

## Choosing Between Similar Hooks

- `useToggle` vs `useBoolean`: use `useToggle` for a compact boolean toggle; use `useBoolean` when explicit `setTrue` and `setFalse` improve call-site clarity.
- `useLocalStorage` vs `useReadLocalStorage`: use `useLocalStorage` when the component owns writes; use `useReadLocalStorage` for passive readers.
- `useDarkMode` vs `useTernaryDarkMode`: use `useDarkMode` for boolean dark/light; use `useTernaryDarkMode` when the user can choose system preference.
- `useWindowSize` vs `useMediaQuery`: use `useMediaQuery` for layout breakpoints; use `useWindowSize` when exact dimensions are needed.
- `useResizeObserver` vs `useWindowSize`: use `useResizeObserver` for element dimensions; use `useWindowSize` for viewport dimensions.
- `useEventListener` vs React `onClick`: use React props for component-local events; use `useEventListener` for window, document, refs, media query lists, or dynamic external targets.
