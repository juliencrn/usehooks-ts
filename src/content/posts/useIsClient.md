---
title: useIsClient
path: '/use-is-client'
date: '2020-09-28'
gistId: 'b0ae507efa57a66aa32162101bdfa674'
gistFilename: useIsClient.tsx
---

This react hook is very simple but it is useful. Indeed, if you manually do a `typeof window! ==" undefined "` type check, then your function will be escaped, but it will stop there.

Thanks to this hook, there will be a first render where `isClient` will be `false`, then when the window is ready, the `useEffect` will be executed, will update the value of `isClient` and restart your component with the window defined.
