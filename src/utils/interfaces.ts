type TemplateKey = 'post'

export interface Post {
  excerpt: string
  frontmatter: {
    templateKey: TemplateKey
    path: string
    title: string
    date: string
    keywords?: string[]
    gistId?: string
    gistFilename?: string
  }
  body: string
}

export interface PageTemplate {
  location: Location
  pageContext: any
  path: string
}
