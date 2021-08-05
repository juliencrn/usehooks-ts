import { graphql, useStaticQuery } from 'gatsby'

export interface SiteMetadata {
  title: string
  description: string
  siteUrl: string
  author: string
}

interface Query {
  site: {
    siteMetadata: SiteMetadata
  }
}

function useSiteMetadata() {
  const data = useStaticQuery<Query>(graphql`
    {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
        }
      }
    }
  `)

  // Return directly wanted data
  return data.site.siteMetadata
}

export default useSiteMetadata
