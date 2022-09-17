/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React, { Fragment } from 'react'

import { GatsbySSR } from 'gatsby'

const GoogleAdsTag = (
  <script
    key="google-ads"
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5817566022458684"
    crossOrigin="anonymous"
  />
)

const GoogleFontTag = (
  <Fragment key="google-fonts">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="true"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400&family=Fira+Sans:wght@300;400;700&display=swap"
      rel="stylesheet"
    />
  </Fragment>
)

export const onRenderBody: GatsbySSR['onRenderBody'] = props => {
  props.setHtmlAttributes({ lang: 'en' })
  props.setHeadComponents([GoogleAdsTag, GoogleFontTag])
}

export { default as wrapPageElement } from './src/libs/wrapPageElement'
