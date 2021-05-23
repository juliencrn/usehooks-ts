import React from 'react'

import Hero from '~/components/hero'
import SEO from '~/components/seo'
import { useSiteMetadata } from '~/hooks'
import { PageTemplate } from '~/models'

function PostListTemplate({ location }: PageTemplate) {
  const { title, description } = useSiteMetadata()

  return (
    <>
      <SEO title={title} description={description} location={location} />

      <Hero title={title} description={description} fullHeight />
    </>
  )
}

export default PostListTemplate
