# 🔐 useUniqueId

A **cryptographically secure**, **SSR-safe**, and **React-compliant** hook for generating stable, unique IDs per component instance effortlessly. Ideal for accessibility IDs, dynamic keys, DOM IDs, or any place where uniqueness and consistency are important.

- Accessibility attributes (like aria IDs)
- Dynamic React keys
- DOM element IDs
- Any scenario demanding consistent, unique identifiers across server and client renders

---

## 🛠 Why choose this hook?

**Cryptographically secure**: Utilizes the modern crypto.randomUUID() API when available for industry-standard randomness.

**Robust fallback strategy**: Gracefully falls back to crypto.getRandomValues() or Math.random() only if necessary, ensuring maximum compatibility.

**SSR-safe & React-friendly**: Guarantees stable IDs between server-side rendering and client hydration, preventing React reconciliation issues.

**Lightweight & deterministic**: No external dependencies, just pure, reliable uniqueness you can trust.

---

## 🔧 How it works

The hook generates a UUID string using:

- _crypto.randomUUID()_ — the most secure and standards-compliant method.
- _crypto.getRandomValues(_) — a secure fallback for environments without randomUUID.
- _Math.random()_ — as a last resort for legacy browsers or sandboxed iframes.
- This ensures maximum compatibility while maintaining security and uniqueness.
- If neither available (e.g., CSP-restricted or legacy browsers), uses Math.random()
- Ensures consistent ID generation per instance, even during SSR hydration

---

## 🚀 Features

- Generates **UUID v4–like** 32-character hex strings
- Supports **prefix**, **dashed format**, and **length truncation**
- Works with **React Server Components** and **SSR environments**
- **SSR-safe**: Ensures consistent IDs between server-side rendering and client hydration.
- **React-friendly**: Stable per component instance, preventing React reconciliation issues.
- **Robust fallback mechanism**: Uses crypto.randomUUID() if available, falls back to crypto.getRandomValues(), and finally Math.random() for legacy environments.
- **Lightweight & dependency-free**: Pure JavaScript with no external dependencies.
- Fallback to `Math.random()` when crypto APIs are unavailable
- Stable across re-renders — generated once per instance

---

## 📦 API

```ts
useUniqueId(options?: {
  prefix?: string        // Optional prefix string to prepend to ID
  withDashes?: boolean   // Include UUID dashes (default: false)
  length?: number        // Truncate output to this length (optional)
}): string
```

---

## 💡 Examples

```ts
const id = useUniqueId()
// → "b1a9dba3bc934b6a84b1cc98b4feab1a"

const prefixedId = useUniqueId({ prefix: 'user-' })
// → "user-b1a9dba3bc934b6a84b1cc98b4feab1a"

const dashedId = useUniqueId({ withDashes: true })
// → "3cb742e6-96bb-4684-b9ea-7e46a5dfb324"

const shortIdWithPrefix = useUniqueId({ prefix: 'btn-', length: 10 })
// → "btn-f2e1cb42a1"

const shortId = useUniqueId({ length: 10 })
// → "3fc7e2a9c1"
```

```js
function MyComponent() {
  const id = useUniqueId()

  return (
    <div>
      <label htmlFor={id}>Enter your name:</label>
      <input id={id} type="text" />
    </div>
  )
}
```
