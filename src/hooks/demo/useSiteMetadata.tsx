import React from 'react'
import useSiteMetadata from '../useSiteMetadata'

export default function Header() {
  const { title } = useSiteMetadata()

  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}
