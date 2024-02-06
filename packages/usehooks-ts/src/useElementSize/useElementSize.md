This hook helps you to dynamically recover the width and the height of an HTML element.
Dimensions are updated on load, on mount/un-mount, when resizing the window and when the ref changes.

**Note**: If you use this hook in an SSR context, set the `initializeWithValue` option to `{ width: undefined, height: undefined }` (You can pass it default values when initializing the hook, see example below).
