import { useIsomorphicLayoutEffect } from '..'

export default function Component() {
  useIsomorphicLayoutEffect(() => {
    console.log(
      "In the browser, I'm an `useLayoutEffect`, but in SSR, I'm an `useEffect`.",
    )
  }, [])

  return <p>Hello, world</p>
}
