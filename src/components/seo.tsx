/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../hooks'

interface MetaProperty {
  property: string
  content: string
}

interface MetaName {
  name: string
  content: string
}

type Meta = MetaName | MetaProperty

export interface SEOProps {
  title: string
  description?: string
  lang?: string
  meta?: Meta[]
  path?: string
  isPost?: boolean
}

const SEO: FC<SEOProps> = ({
  description = '',
  lang = 'en',
  meta = [],
  title,
  path = '/',
  isPost = false,
}) => {
  const siteMetadata = useSiteMetadata()
  const metaDescription = description || siteMetadata.description
  const url = `${siteMetadata.siteUrl}${path}`

  // Build image from title using "Typescript blue" optimized for Facebook banned
  const image = `https://via.placeholder.com/1200x630.png/007ACC/fff/?text=${title}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      link={[{ rel: 'canonical', key: url, href: url }]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:site_name`,
          content: siteMetadata.title,
        },
        {
          property: `og:type`,
          content: isPost ? `article` : `website`,
        },
        {
          property: `og:url`,
          content: url,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

export default SEO
