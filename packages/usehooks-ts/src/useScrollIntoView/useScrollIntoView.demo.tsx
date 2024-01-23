import { useScrollIntoView } from '..'

export default function Component() {
  // Retrieve the ref and scroll toggling function
  const [scrollToElementRef, scrollToElement] =
    useScrollIntoView<HTMLDivElement>()

  return (
    <div style={{ height: '200px', overflowY: 'scroll' }}>
      <div style={{ paddingBottom: '400px' }}>
        <button onClick={scrollToElement}>Scroll to Bottom</button>
      </div>

      <div ref={scrollToElementRef}>Scroll to me</div>
    </div>
  )
}
