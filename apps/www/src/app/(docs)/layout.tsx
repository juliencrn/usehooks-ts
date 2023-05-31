import '../globals.css'

import Link from 'next/link'

import { Icons } from '@/components/icons'
import { MainNav } from '@/components/main-nav'
import { ModeToggle } from '@/components/mode-toggle'
// import { DocsSearch } from "@/components/search"
import { DocsSidebarNav } from '@/components/sidebar-nav'
import { docsConfig } from '@/config/docs'
import { siteConfig } from '@/config/site'

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={docsConfig.mainNav}>
            <DocsSidebarNav items={docsConfig.sidebarNav} />
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
                <Icons.gitHub className="h-6 w-6 my-auto" />
                <span className="sr-only">GitHub</span>
              </Link>
              <ModeToggle />
            </nav>
          </div>
        </div>
      </header>
      <div className="container flex-1">
        <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
          <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem-1px)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10">
            <DocsSidebarNav items={docsConfig.sidebarNav} />
          </aside>
          {children}
        </div>
      </div>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  )
}
