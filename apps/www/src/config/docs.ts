import { getHookList } from '@/lib/api'
import { mapHookToNavLink } from '@/lib/utils'
import type { DocsConfig } from '@/types'

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
      items: getHookList().map(mapHookToNavLink),
    },
  ],
}
