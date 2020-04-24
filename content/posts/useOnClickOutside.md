---
templateKey: post
title: useOnClickOutside
path: "/use-on-click-outside"
date: "2019-04-23"
gistId: "d2ab61ffd33396317e5cd336edb62afe"
gistFilename: useOnClickOutside.ts
---

Persist the state with local storage so that it remains after a page refresh. This can be useful for a dark theme or to record session information.
This hook is used in the same way as useState except that you must pass the storage key in the 1st parameter.
If the window object is not present (as in SSR), `useLocalStorage()` will return the default value.
