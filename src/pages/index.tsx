import React from 'react'
// import { makeStyles, Theme } from '@material-ui/core/styles'

import SEO from '../components/seo'
import Hero from '../components/hero'
import { useSiteMetadata } from '../hooks'

// const useStyles = makeStyles((theme: Theme) => ({}))

function PostListTemplate() {
  const { title, description } = useSiteMetadata()

  return (
    <>
      <SEO title={title} description={description} path="/" />

      <Hero title={title} description={description} fullHeight />
    </>
  )
}

export default PostListTemplate
