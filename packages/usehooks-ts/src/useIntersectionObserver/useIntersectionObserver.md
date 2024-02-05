This React Hook detects visibility of a component on the viewport using the [`IntersectionObserver` API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) natively present in the browser.

It can be very useful to lazy-loading of images, implementing "infinite scrolling", tracking view in GA or starting animations for example.

### Option properties

- `threshold` (optional, default: `0`): A threshold indicating the percentage of the target's visibility needed to trigger the callback. Can be a single number or an array of numbers.
- `root` (optional, default: `null`): The element that is used as the viewport for checking visibility of the target. It can be an Element, Document, or null.
- `rootMargin` (optional, default: `'0%'`): A margin around the root. It specifies the size of the root's margin area.
- `freezeOnceVisible` (optional, default: `false`): If true, freezes the intersection state once the element becomes visible. Once the element enters the viewport and triggers the callback, further changes in intersection will not update the state.
- `onChange` (optional): A callback function to be invoked when the intersection state changes. It receives two parameters: `isIntersecting` (a boolean indicating if the element is intersecting) and `entry` (an IntersectionObserverEntry object representing the state of the intersection).
- `initialIsIntersecting` (optional, default: `false`): The initial state of the intersection. If set to true, indicates that the element is intersecting initially.

**Note:** This interface extends the native `IntersectionObserverInit` interface, which provides the base options for configuring the Intersection Observer.

For more information on the Intersection Observer API and its options, refer to the [MDN Intersection Observer API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

### Return

The `IntersectionResult` type supports both array and object destructuring and includes the following properties:

- `ref`: A function that can be used as a ref callback to set the target element.
- `isIntersecting`: A boolean indicating if the target element is intersecting with the viewport.
- `entry`: An optional `IntersectionObserverEntry` object representing the state of the intersection.
