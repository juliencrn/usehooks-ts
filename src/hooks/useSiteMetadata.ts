import { graphql, useStaticQuery } from 'gatsby'

export interface SiteMetadata {
  title: string
  description: string
  siteUrl: string
  author: {
    name: string
    content: string
    github: string
  }
  social: {
    github: string
  }
}

export default (): SiteMetadata => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author {
            name
            content
            github
          }
          social {
            github
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}
