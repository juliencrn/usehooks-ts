/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC } from 'react'

import { useLocation } from '@reach/router'

import useSiteMetadata from '~/hooks/useSiteMetadata'

export interface SEOProps {
  title?: string
  description?: string
}

const SEO: FC<SEOProps> = ({ title = '', description = '', children }) => {
  const location = useLocation()
  const siteMetadata = useSiteMetadata()
  const seo = {
    title: title || siteMetadata.title,
    description: description || siteMetadata.description,
    siteName: siteMetadata.title,
    // Build image from title using "Typescript blue" optimized for Facebook banned
    image: `https://via.placeholder.com/1200x630.png/007ACC/fff/?text=${title}`,
    url: `${siteMetadata.siteUrl}${location.pathname}`,
  }

  const isHookPage = new RegExp('/react-hook/').test(seo.url)

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" key={seo.url} href={seo.url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:site_name" content={seo.siteName} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content={isHookPage ? `article` : `website`} />
      <meta property="og:url" content={seo.url} />

      {children}

      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5817566022458684"
        crossOrigin="anonymous"
      ></script>
    </>
  )
}

export default SEO
