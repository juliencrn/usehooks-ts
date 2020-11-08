export type { Post } from './Post'
export type { Page } from './Page'
export type { Hook } from './Hook'

export interface PageTemplate {
  location: Location
  pageContext: any
  path: string
}
