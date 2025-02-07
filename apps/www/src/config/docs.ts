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
        {
          title: 'Migrate to v4',
          href: '/migrate-to-v4',
        },
      ],
    },
    // Note: Hooks are added here dynamically
  ],
}
