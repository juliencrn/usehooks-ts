import { DocsPageHeader } from '@/components/docs-page-header'
import { DashboardTableOfContents } from '@/components/table-of-content'
import { components } from '@/components/ui/components'

export default async function IntroductionPage() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader
          id="migrate-to-v3"
          className="scroll-m-20"
          heading={'Migrate to v3'}
        />
        <components.h2>Introduction</components.h2>
        <components.p>
          <span className="font-bold">useHooks(🔥).ts </span>
          {`bumped to version
          3.0.0 and it's a major release. This version includes a lot of changes
          and improvements.`}
        </components.p>

        <components.h2>Changes</components.h2>
        <components.h3>Removed hooks</components.h3>
        <components.p>
          Some hooks were removed from the library. The following hooks were
          removed:
        </components.p>
        <components.ul>
          <components.li>
            <components.code>useDebounce</components.code>: Replaced by both{' '}
            <components.a href="/react-hook/use-debounce-value">
              useDebounceValue
            </components.a>{' '}
            and{' '}
            <components.a href="/react-hook/use-debounce-callback">
              useDebounceCallback
            </components.a>
            .
          </components.li>
          <components.li>
            <components.code>useFetch</components.code>
            {`: Prefer other solutions
            like React server components, your framework's data fetching
            solution, or a caching library like `}
            <components.a href="https://swr.vercel.app">SWR</components.a> or{' '}
            <components.a href="https://tanstack.com/query/latest">
              React Query
            </components.a>
            .
          </components.li>
          <components.li>
            <components.code>useElementSize</components.code>: Replaced by more
            performant{' '}
            <components.a href="/react-hook/use-resize-observer">
              <components.code>useResizeObserver</components.code>
            </components.a>
            .
          </components.li>
          <components.li>
            <components.code>useLockedBody</components.code>: Replaced by more
            generic{' '}
            <components.a href="/react-hook/use-scroll-lock">
              <components.code>useScrollLock</components.code>
            </components.a>
            .
          </components.li>
          <components.li>
            <components.code>useIsFirstRender</components.code>: Not comply with
            the React functional mindset.
          </components.li>
          <components.li>
            <components.code>useSsr</components.code>: It was not a React hook.
          </components.li>
          <components.li>
            <components.code>useEffectOnce</components.code>: Unnecessary
            abstraction, prefer built-in React hooks.
          </components.li>
          <components.li>
            <components.code>useUpdateEffect</components.code>: Unnecessary
            abstraction, prefer built-in React hooks.
          </components.li>
          <components.li>
            <components.code>useImageOnLoad</components.code>: Too opinionated.
          </components.li>
        </components.ul>

        <components.h3>Updated hook signatures</components.h3>
        <components.p>
          Some hook signature have been updated introducing breaking changes.
        </components.p>
        <components.ul>
          <components.li>
            <components.a href="/react-hook/use-countdown">
              <components.code>useCountdown</components.code>
            </components.a>
          </components.li>
          <components.li>
            <components.a href="/react-hook/use-dark-mode">
              <components.code>useDarkMode</components.code>
            </components.a>
          </components.li>
          <components.li>
            <components.a href="/react-hook/use-intersection-observer">
              <components.code>useIntersectionObserver</components.code>
            </components.a>
          </components.li>
          <components.li>
            <components.a href="/react-hook/use-media-query">
              <components.code>useMediaQuery</components.code>
            </components.a>
          </components.li>
          <components.li>
            <components.a href="/react-hook/use-dark-mode">
              <components.code>useTernaryDarkMode</components.code>
            </components.a>
          </components.li>
        </components.ul>
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents
            toc={{
              items: [
                { title: 'Introduction', url: '#introduction' },
                {
                  title: 'Changes',
                  url: '#changes',
                  items: [
                    { title: 'Removed hooks', url: '#removed hooks' },
                    {
                      title: 'Updated hook signatures',
                      url: '#updated hook signature',
                    },
                  ],
                },
              ],
            }}
          />
        </div>
      </div>
    </main>
  )
}
