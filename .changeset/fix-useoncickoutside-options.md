---
"usehooks-ts": patch
---

fix(useOnClickOutside): change `eventListenerOptions` from `AddEventListenerOptions = {}` to `boolean | AddEventListenerOptions | undefined`. The previous default of `{}` created a new object reference on every render, causing `useEventListener`'s effect to re-run and re-subscribe the listener unnecessarily on each render.
