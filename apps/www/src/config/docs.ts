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
          title: 'Migrate to v3',
          href: '/migrate-to-v3',
        },
      ],
    },
    // Note: Hooks are added here dynamically
  ],
}
