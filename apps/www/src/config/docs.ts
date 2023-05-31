import { getPosts } from '@/lib/mdx'
import { DocsConfig, NavItem } from '@/types'

export const hookNavItems: NavItem[] = getPosts().map(post => ({
  title: post.name,
  href: post.href,
}))

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/introduction',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/introduction',
        },
      ],
    },
    {
      title: 'Hooks',
      items: hookNavItems,
    },
  ],
}
