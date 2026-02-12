A React hook for observing DOM changes on a target element using the [MutationObserver API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

### Parameters

- `elementRef`: A React ref object that points to the DOM element to observe.
- `config`: The [MutationObserver options](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe#parameters), such as `attributes`, `childList`, and `subtree`.

### Returns

- `mutationList`: An array of the latest [`MutationRecord`](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord) entries received from the observer callback.
- `getMutationListByType`: A helper function that filters `mutationList` by mutation type (`'attributes' | 'characterData' | 'childList'`).

### Notes

- The hook uses native `MutationObserver` and runs only in environments where it is available.
- The observer is disconnected automatically when the component unmounts or dependencies change.
