import React, { useRef } from 'react'

import useIntersectionObserver from './useIntersectionObserver'

const Section = (props: { title: string }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {})
  const isVisible = !!entry?.isIntersecting

  console.log(`Render Section ${props.title}`, { isVisible })

  return (
    <div
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        border: '1px dashed #000',
      }}
    >
      <div style={{ margin: 'auto' }}>{props.title}</div>
    </div>
  )
}

export default function Component() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Section key={index + 1} title={`${index + 1}`} />
      ))}
    </>
  )
}
