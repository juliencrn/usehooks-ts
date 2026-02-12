import { useEventCallback } from './useEventCallback'

export default function Component() {
  const handleClick = useEventCallback(event => {
    // Handle the event here
    console.log('Clicked', event)
  })

  return <button onClick={handleClick}>Click me</button>
}
