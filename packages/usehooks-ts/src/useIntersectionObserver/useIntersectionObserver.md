This React Hook detects visibility of a component on the viewport using the [`IntersectionObserver` API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) natively present in the browser.

It can be very useful to lazy-loading of images, implementing "infinite scrolling" or starting animations for example.

Your must pass the ref element (from `useRef()`).

It takes optionally `root`, `rootMargin` and `threshold` arguments from the [native `IntersectionObserver` API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) and `freezeOnceVisible` to only catch the first appearance too.

It returns the full IntersectionObserver's `entry` object.

<br />

**Source:**

I discovered this way of using `IntersectionObserver` via this [post medium](https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5) while playing to build a [lazy-loaded collection of images](https://react-gallery.juliencaron.com/).
