import React from 'react'

import Hero from '~/components/hero'
import SEO from '~/components/seo'
import useSiteMetadata from '~/hooks/useSiteMetadata'

function PostListTemplate() {
  const { title, description } = useSiteMetadata()

  return (
    <>
      <SEO
        title={'usehooks-ts - React hooks library, written in Typescript'}
        description={description}
      />

      <Hero title={title} description={description} fullHeight />
    </>
  )
}

export default PostListTemplate
