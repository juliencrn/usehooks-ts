export interface Gist {
  url: string
  updated: string
  code: string
}

export interface Post {
  excerpt: string
  shortDescription: string
  frontmatter: {
    path: string
    title: string
    gistId: string
    gistFilename: string
  }
  body: string
  gist: Gist
}

export interface PageTemplate {
  location: Location
  pageContext: any
  path: string
}
