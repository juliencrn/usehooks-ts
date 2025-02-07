import { PageHeader } from '@/components/docs/page-header'
import { components } from '@/components/ui/components'

export default async function MigrateToV4Page() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <PageHeader
          id="migrate-to-v4"
          className="scroll-m-20"
          heading={'Migrate to v4'}
        />
        <components.p>
          <components.code>usehooks-ts</components.code> bumped to version 4 and
          it&apos;s a major release to support{' '}
          <components.a
            href="https://react.dev/blog/2024/12/05/react-19"
            target="_blank"
          >
            React 19
          </components.a>
          . Just install v4 and you&apos;re good to go.
        </components.p>
      </div>
    </main>
  )
}
