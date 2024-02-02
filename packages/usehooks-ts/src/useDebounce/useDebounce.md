**Note: This hook is depreciated and will be removed in the next major version. See the brand new [`useDebounceValue`](/react-hook/use-debounce-value) and [`useDebounceCallback`](/react-hook/use-debounce-callback) hooks.**

This React hook helps to limit that the component is re-rendered too many times.
Imagine that you want to execute a function on an event that executes several hundred times per second such as moving the mouse or scrolling. This may cause the application to lag.
To prevent this, the debounce uses an internal timer to execute the callback function every xx seconds (2nd parameter).

Consider the example below. Each time the user enters the field, the onChange event is triggered. On the other hand, the unfolded variable is updated at most every 500ms.
If you have to make an API call to find the elements that match the search term, you can do so by monitoring the unpacked variable, which will be more economical.

### Related hooks

- [`useDebounceCallback`](/react-hook/use-debounce-callback): This hook provides precise control for debouncing various functions, allowing you to manage delays effectively.
- [`useDebounceValue`](/react-hook/use-debounce-value): Leveraging the functionality of useDebounceCallback, this hook returns the debounced value. It's particularly handy for debouncing input fields, such as search inputs, ensuring smooth user interactions.
