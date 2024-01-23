The `useScroll` hook is a custom React hook designed to provide real-time tracking of the vertical and horizontal scroll position of a webpage. It utilizes React's `useState` and `useEffect` hooks to manage the scroll position state and set up event listeners for scroll events.
It could be used for styling a component on scrolling

The useScroll hook returns an object with two properties: scrollX and scrollY. These properties represent the horizontal and vertical scroll positions, respectively.

So, when you use the hook in a component, you can destructure the result to access both scrollX and scrollY:
