---
"usehooks-ts": patch
---

fix(useOnClickOutside): make `eventListenerOptions` optional to prevent unnecessary re-subscriptions.

Previously defaulting to `{}` caused a new object reference on every render, triggering `useEffect` to tear down and re-attach the event listener each time even when nothing changed.
