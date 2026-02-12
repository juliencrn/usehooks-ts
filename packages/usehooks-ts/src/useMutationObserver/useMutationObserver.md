A React hook for observing DOM changes on a target element using the [MutationObserver API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

### Parameters

Takes a single `options` object with the following properties:

- `ref`: A React ref object that points to the DOM element to observe.
- `attributes`, `childList`, `subtree`, `characterData`, `attributeFilter`, `attributeOldValue`, `characterDataOldValue`: The [MutationObserver options](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe#parameters).
- `onMutation` _(optional)_: A callback invoked with the mutation records. When provided, the hook doesn't re-render on DOM changes; it delegates handling to the callback.

### Returns

- `mutationList`: An array of the latest [`MutationRecord`](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord) entries received from the observer callback.
- `getMutationListByType`: A helper function that filters `mutationList` by mutation type (`'attributes' | 'characterData' | 'childList'`).

### Notes

- The hook uses native `MutationObserver` and runs only in environments where it is available.
- The observer is disconnected automatically when the component unmounts or dependencies change.
- Config options are destructured into primitive dependencies, so inline option objects do not cause infinite re-renders.
