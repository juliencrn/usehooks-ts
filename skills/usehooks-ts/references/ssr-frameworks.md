# SSR And Framework Guidance

Use this file for Next.js, Remix, Astro, Gatsby, React Server Components, server rendering, or hydration problems.

## Next.js App Router

Components that call `usehooks-ts` hooks are client components:

```tsx
'use client'

import { useLocalStorage } from 'usehooks-ts'

export function Preferences() {
  const [theme, setTheme] = useLocalStorage('theme', 'system', {
    initializeWithValue: false,
  })

  return <button onClick={() => setTheme('dark')}>{theme}</button>
}
```

Keep data fetching and static content in Server Components. Move only interactive behavior into a client child:

```tsx
// Server component
import { PreferencesClient } from './preferences-client'

export default async function SettingsPage() {
  const settings = await loadSettings()
  return <PreferencesClient initialName={settings.name} />
}
```

## Hydration-Sensitive Hooks

Use `initializeWithValue: false` when the server cannot know the client value and mismatched markup would matter:

- `useLocalStorage`
- `useSessionStorage`
- `useReadLocalStorage`
- `useMediaQuery`
- `useWindowSize`
- `useScreen`
- `useDarkMode`
- `useTernaryDarkMode`

Use `defaultValue` where available to keep first render deterministic:

```tsx
const prefersDesktop = useMediaQuery('(min-width: 1024px)', {
  defaultValue: false,
  initializeWithValue: false,
})
```

## Browser-Only APIs

These hooks depend on browser APIs and should not be called in Server Components:

- Clipboard: `useCopyToClipboard`
- DOM events: `useEventListener`, `useOnClickOutside`, `useClickAnyWhere`, `useHover`
- Observers: `useResizeObserver`, `useIntersectionObserver`
- Window/screen/media: `useWindowSize`, `useScreen`, `useMediaQuery`
- Storage: `useLocalStorage`, `useSessionStorage`, `useReadLocalStorage`
- Document/script/scroll: `useDocumentTitle`, `useScript`, `useScrollLock`

If a page needs server output plus browser behavior, split files. The server file imports a client component; the client component imports `usehooks-ts`.

## Storage Hooks

Storage hooks serialize with JSON by default:

```tsx
const [filters, setFilters, clearFilters] = useLocalStorage(
  'filters',
  { sort: 'recent' },
  { initializeWithValue: false },
)
```

Use custom serializers for non-plain values:

```tsx
const [lastSeen, setLastSeen] = useLocalStorage<Date>(
  'last-seen',
  new Date(0),
  {
    initializeWithValue: false,
    serializer: value => value.toISOString(),
    deserializer: value => new Date(value),
  },
)
```

Use stable, namespaced keys:

```tsx
const key = `acme:dashboard:${userId}:filters`
```

When a value includes user or tenant scope, include that scope in the key or reset state when the scope changes.

## Media And Layout

Prefer CSS for pure styling. Use hooks only when JavaScript logic must change:

- Use CSS media queries for layout and visibility.
- Use `useMediaQuery` when component behavior or data changes by breakpoint.
- Use `useWindowSize` for exact viewport measurement.
- Use `useResizeObserver` for element measurement.

Avoid rendering entirely different server markup based on client-only viewport values. If necessary, render a neutral shell first, then enhance after hydration.

## External Scripts

Use `useScript` when a component must load a script and react to load status:

```tsx
const status = useScript('https://example.com/widget.js', {
  id: 'example-widget',
  removeOnUnmount: true,
})
```

The package hook appends to `document.body`. If the script must be mounted inside a specific container, write a local hook or component for that vendor.

## Dark Mode

For simple dark/light state:

```tsx
const { isDarkMode, toggle } = useDarkMode({
  initializeWithValue: false,
})
```

For user-selectable system/dark/light:

```tsx
const {
  isDarkMode,
  ternaryDarkMode,
  setTernaryDarkMode,
} = useTernaryDarkMode({ initializeWithValue: false })
```

The hooks return state and controllers; they do not automatically apply a `class="dark"` policy to your app. Apply the returned state to your theme provider, document class, or design system convention.
