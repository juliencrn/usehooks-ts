---
'usehooks-ts': major
---

Add `priority` setting to `useLocalStorage`.

For persisted settings that affect initial render and the page layout, you can use `{ priority: 'max' }`; this will cause the hook to compose `useLayoutEffect` instead of `useEffect` to ensure the most rapid update and help avoid UI jumpiness.
