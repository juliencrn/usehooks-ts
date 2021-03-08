```tsximport React, { FC, useRef } from 'react'

import useIntersectionObserver from './useIntersectionObserver'

const Section: FC = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {})
  const isVisible = !!entry?.isIntersecting

  console.log(`Render Section ${children?.toString()}`, { isVisible })

  return (
    <div
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        border: '1px dashed #000',
      }}
    >
      <div style={{ margin: 'auto' }}>{children}</div>
    </div>
  )
}

export default function Component() {
  return (
    <>
      <Section key="1">div n°1</Section>
      <Section key="2">div n°2</Section>
      <Section key="3">div n°3</Section>
      <Section key="4">div n°4</Section>
      <Section key="5">div n°5</Section>
    </>
  )
}
```