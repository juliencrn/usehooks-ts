import React from 'react'

import Hero from '~/components/hero'
import SEO from '~/components/seo'
import { useSiteMetadata } from '~/hooks'

function PostListTemplate() {
  const { title, description } = useSiteMetadata()

  return (
    <>
      <SEO title={title} description={description} />

      <Hero title={title} description={description} fullHeight />
    </>
  )
}

export default PostListTemplate
