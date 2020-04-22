---
templateKey: post
title: useLocalStorage
path: "/use-local-storage"
date: "2019-04-20"
gistId: "59598636c81071fd8c66af092fb02a09"
gistFilename: useLocalStorage.ts
---

Persist the state with local storage so that it remains after a page refresh. This can be useful for a dark theme or to record session information.
This hook is used in the same way as useState except that you must pass the storage key in the 1st parameter.
If the window object is not present (as in SSR), `useLocalStorage()` will return the default value.
