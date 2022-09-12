import React from 'react'

import SEO from '../components/seo'
import Hero from '~/components/hero'

const pageData = {
  title: 'Page Not Found',
  description: "You just hit a route that doesn't exist... the sadness.",
}

export const Head = () => (
  <SEO
    title={`${pageData.title}() react hook - usehooks-ts`}
    description={pageData.description}
  />
)

function NotFoundPage() {
  return <Hero {...pageData} fullHeight />
}

export default NotFoundPage
