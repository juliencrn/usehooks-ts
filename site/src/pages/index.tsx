import React from 'react'

import Hero from '~/components/hero'
import SEO from '~/components/seo'
import useSiteMetadata from '~/hooks/useSiteMetadata'

export const Head = () => <SEO />

function PostListTemplate() {
  const { title, description } = useSiteMetadata()
  return <Hero title={title} description={description} fullHeight />
}

export default PostListTemplate
