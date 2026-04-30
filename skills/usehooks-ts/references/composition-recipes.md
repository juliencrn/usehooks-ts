# Composition Recipes

Use these examples as starting points. Adapt names, storage keys, and UI components to the project.

## Persistent Form Draft

```tsx
'use client'

import { useLocalStorage } from 'usehooks-ts'

type Draft = {
  title: string
  body: string
}

export function DraftEditor() {
  const [draft, setDraft, clearDraft] = useLocalStorage<Draft>(
    'post-draft',
    { title: '', body: '' },
    { initializeWithValue: false },
  )

  return (
    <form>
      <input
        value={draft.title}
        onChange={event =>
          setDraft(current => ({ ...current, title: event.target.value }))
        }
      />
      <textarea
        value={draft.body}
        onChange={event =>
          setDraft(current => ({ ...current, body: event.target.value }))
        }
      />
      <button type="button" onClick={clearDraft}>
        Clear
      </button>
    </form>
  )
}
```

## Debounced Search

Use `useDebounceValue` when state should lag user input:

```tsx
const [query, setQuery] = useState('')
const [debouncedQuery] = useDebounceValue(query, 300)

useEffect(() => {
  if (!debouncedQuery) return
  void search(debouncedQuery)
}, [debouncedQuery])
```

Use `useDebounceCallback` when the side effect itself should be debounced:

```tsx
const saveDraft = useDebounceCallback(async (value: Draft) => {
  await api.saveDraft(value)
}, 500)

useEffect(() => {
  saveDraft(draft)
}, [draft, saveDraft])
```

Cancel or flush if the UX requires it:

```tsx
useUnmount(() => {
  saveDraft.flush()
})
```

## Dismissible Popover

```tsx
const popoverRef = useRef<HTMLDivElement>(null)
const { value: open, setFalse: close, toggle } = useBoolean(false)

useOnClickOutside(popoverRef, close)

return (
  <>
    <button onClick={toggle}>Menu</button>
    {open && <div ref={popoverRef}>...</div>}
  </>
)
```

For keyboard dismissal:

```tsx
useEventListener('keydown', event => {
  if (event.key === 'Escape') close()
})
```

## Copy Button

```tsx
const [copiedText, copy] = useCopyToClipboard()
const [copied, setCopied] = useState(false)

async function handleCopy(value: string) {
  const ok = await copy(value)
  if (!ok) return
  setCopied(true)
  window.setTimeout(() => setCopied(false), 1500)
}
```

Handle failure because clipboard access can be blocked.

## Scroll-Locked Overlay

```tsx
function Modal({ open, onClose }: Props) {
  useScrollLock({ autoLock: open })

  if (!open) return null
  return <div role="dialog">...</div>
}
```

For manual control:

```tsx
const { isLocked, lock, unlock } = useScrollLock({ autoLock: false })
```

## Responsive Behavior

```tsx
const isDesktop = useMediaQuery('(min-width: 1024px)', {
  defaultValue: false,
  initializeWithValue: false,
})

return isDesktop ? <DesktopNav /> : <MobileNav />
```

Prefer CSS for styling-only changes. Use this only when component behavior changes.

## Element Measurement

```tsx
const ref = useRef<HTMLDivElement>(null)
const { width = 0 } = useResizeObserver({ ref })

return <div ref={ref}>{width > 480 ? <Wide /> : <Compact />}</div>
```

Use `onResize` for expensive updates that should avoid rerendering the measuring component:

```tsx
useResizeObserver({
  ref,
  onResize: size => reportSize(size),
})
```

## Lazy Reveal

```tsx
const { ref, isIntersecting } = useIntersectionObserver({
  threshold: 0.25,
  freezeOnceVisible: true,
})

return <section ref={ref}>{isIntersecting ? <Chart /> : null}</section>
```

## Countdown

```tsx
const [count, controls] = useCountdown({
  countStart: 10,
  countStop: 0,
  intervalMs: 1000,
})

return (
  <>
    <span>{count}</span>
    <button onClick={controls.startCountdown}>Start</button>
    <button onClick={controls.stopCountdown}>Stop</button>
    <button onClick={controls.resetCountdown}>Reset</button>
  </>
)
```

## Document Title

```tsx
useDocumentTitle(project.name)
```

Keep title construction near route or page components, not deeply nested widgets, unless the widget owns the page-level state.

## External Script Status

```tsx
const status = useScript('https://cdn.example.com/sdk.js', {
  id: 'example-sdk',
})

if (status === 'loading') return <Spinner />
if (status === 'error') return <RetryMessage />
return <Widget />
```
