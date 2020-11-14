export type { Post, AnyMdx } from './Post'
export type { Page } from './Page'

export interface PageTemplate {
  location: Location
  pageContext: any
  path: string
}
