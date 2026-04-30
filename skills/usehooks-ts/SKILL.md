---
name: usehooks-ts
description: Practical guidance for using the usehooks-ts React hook library in TypeScript projects. Use when choosing hooks, installing or importing usehooks-ts, integrating hooks in React or Next.js components, handling SSR and hydration issues, replacing removed v2 hooks, composing hooks into UI behavior, testing components that use the package, or auditing existing usehooks-ts usage.
---

# usehooks-ts

## Overview

Use this skill to integrate `usehooks-ts` v3-style APIs into React applications safely and idiomatically. Prefer the package's existing hooks over custom hook code when the requested behavior matches a supported hook.

## Fast Workflow

1. Inspect the app context: React version, framework, package manager, TypeScript settings, routing model, and whether the target file runs on the server or client.
2. Confirm the package is installed. If absent, use the project's package manager:

```bash
npm install usehooks-ts
pnpm add usehooks-ts
yarn add usehooks-ts
bun add usehooks-ts
```

3. Import hooks as named exports from the package root:

```tsx
import { useLocalStorage, useMediaQuery } from 'usehooks-ts'
```

4. Choose the hook by intent. Read `references/hook-catalog.md` when choosing among hooks or when exact return shapes matter.
5. Apply SSR rules before editing Next.js, Remix, Astro, Gatsby, or any server-rendered React app. Read `references/ssr-frameworks.md` for those cases.
6. Use recipe references for common UI tasks. Read `references/composition-recipes.md` when implementing behavior rather than just naming a hook.
7. For tests, migrations, or existing code reviews, read `references/testing-pitfalls.md`.
8. Validate with the local app's normal commands: typecheck, lint, focused tests, and a browser check when behavior depends on DOM events, storage, viewport, media queries, clipboard, timers, observers, or scripts.

## Core Rules

- Use named imports from `usehooks-ts`; do not deep-import from `usehooks-ts/dist` or internal package paths.
- In Next.js App Router, any component that calls these hooks must be a Client Component. Add `'use client'` at the top of the component file or move hook usage into a client child.
- For hooks that read browser-only APIs during initial render, prefer `initializeWithValue: false` when server-rendered markup must match client hydration.
- Treat `useLocalStorage`, `useSessionStorage`, and `useReadLocalStorage` as JSON-based by default. Use `serializer` and `deserializer` for `Date`, `Map`, `Set`, classes, lossy values, or custom formats.
- Prefer `useEventCallback`, `useEventListener`, `useInterval`, and `useTimeout` for stale-closure-prone event or timer work.
- Prefer `useDebounceValue` for debounced state and `useDebounceCallback` for debounced side effects.
- Prefer framework-native or cache-aware data fetching. Do not replace React Query, SWR, loaders, or Server Components with removed `useFetch` patterns.
- Avoid wrapping every library hook in a project-local hook unless it centralizes a real policy, storage key, serializer, or UI convention.

## Hook Choice Snapshot

- State utilities: `useBoolean`, `useCounter`, `useMap`, `useStep`, `useToggle`.
- Browser storage: `useLocalStorage`, `useSessionStorage`, `useReadLocalStorage`.
- DOM events and element interaction: `useEventListener`, `useOnClickOutside`, `useClickAnyWhere`, `useHover`.
- Timers and debounce: `useInterval`, `useTimeout`, `useDebounceValue`, `useDebounceCallback`, `useCountdown`.
- Layout and environment: `useWindowSize`, `useScreen`, `useMediaQuery`, `useResizeObserver`, `useIntersectionObserver`, `useIsClient`, `useIsMounted`, `useIsomorphicLayoutEffect`.
- App utilities: `useCopyToClipboard`, `useDarkMode`, `useTernaryDarkMode`, `useDocumentTitle`, `useScript`, `useScrollLock`, `useUnmount`, `useEventCallback`.

## Common Patterns

Persistent state:

```tsx
const [value, setValue, removeValue] = useLocalStorage('settings', initial, {
  initializeWithValue: false,
})
```

Responsive rendering:

```tsx
const isDesktop = useMediaQuery('(min-width: 1024px)', {
  initializeWithValue: false,
})
```

Stable DOM listener:

```tsx
useEventListener('keydown', event => {
  if (event.key === 'Escape') close()
})
```

Click outside:

```tsx
const panelRef = useRef<HTMLDivElement>(null)
useOnClickOutside(panelRef, close, 'mousedown')
```

Debounced input:

```tsx
const [query, setQuery] = useState('')
const [debouncedQuery] = useDebounceValue(query, 300)
```

## Bundled Resources

- `references/hook-catalog.md`: hook-by-hook selection guide and API notes.
- `references/ssr-frameworks.md`: SSR, hydration, Next.js App Router, and browser API guidance.
- `references/composition-recipes.md`: reusable implementation recipes.
- `references/testing-pitfalls.md`: test setup, mocks, migrations, and sharp edges.
- `scripts/audit_usehooks_ts_usage.py`: scan a project for common import, SSR, migration, and client-component issues.

Run the audit script from a project root when reviewing existing code:

```bash
python3 /path/to/skills/usehooks-ts/scripts/audit_usehooks_ts_usage.py .
```
