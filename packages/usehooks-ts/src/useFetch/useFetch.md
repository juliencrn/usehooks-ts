`useFetch` is now **deprecated** and will be removed in the next major release.

The current implementation is not enterprise-grade and it's a bad example of `useEffect` usage, see this [talk on Youtube](https://www.youtube.com/watch?v=bGzanfKVFeU) for more information.

Instead, consider these options:

- Use your own framework feature (like `RSC` or `getServerSideProps` for NextJS by example)
- Use caching libraries like [`useSWR`](https://swr.vercel.app/) or [`react-query`](https://github.com/tannerlinsley/react-query)
- Use the React built-in `use` hook.
