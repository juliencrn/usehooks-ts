import React from 'react'

import SEO from '../components/seo'
import Hero from '~/components/hero'

const pageData = {
  title: 'Page Not Found',
  description: "You just hit a route that doesn't exist... the sadness.",
}

function NotFoundPage() {
  return (
    <>
      <SEO {...pageData} />
      <Hero {...pageData} fullHeight />
    </>
  )
}

export default NotFoundPage
