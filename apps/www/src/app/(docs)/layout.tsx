import '../globals.css'

import Link from 'next/link'

import { GitHub } from '@/components/icons'
import { MainNav } from '@/components/main-nav'
// import { DocsSearch } from "@/components/search"
import { DocsSidebarNav } from '@/components/sidebar-nav'
import { docsConfig } from '@/config/docs'
import { siteConfig } from '@/config/site'
import { getHookList } from '@/lib/api'

type DocsLayoutProps = {
  children: React.ReactNode
}

export default async function DocsLayout({ children }: DocsLayoutProps) {
  const hooks = await getHookList()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={docsConfig.mainNav}>
            <DocsSidebarNav items={docsConfig.sidebarNav} hooks={hooks} />
          </MainNav>
          <div className="flex flex-1 items-center space-x-4 sm:justify-end">
            <div className="flex-1 sm:grow-0">{/* <DocsSearch /> */}</div>
            <nav className="flex space-x-4">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex"
              >
                <GitHub className="h-6 w-6 my-auto" />
                <span className="sr-only">GitHub</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <div className="container flex-1">
        <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
          <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem-1px)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10">
            <DocsSidebarNav items={docsConfig.sidebarNav} hooks={hooks} />
          </aside>
          {children}
        </div>
      </div>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  )
}
