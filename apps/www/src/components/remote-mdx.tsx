/* eslint-disable jsx-a11y/heading-has-content */
import 'highlight.js/styles/github-dark.css'

import { ComponentProps } from 'react'

import Link from 'next/link'
import { SerializeOptions } from 'next-mdx-remote/dist/types'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'

import { cn } from '@/lib/utils'

export const H1 = ({ className, ...props }: ComponentProps<'h1'>) => (
  <h1
    className={cn(
      'mt-2 scroll-m-20 text-4xl font-bold tracking-tight',
      className,
    )}
    {...props}
  />
)

export const H2 = ({ className, ...props }: ComponentProps<'h2'>) => (
  <h2
    className={cn(
      'mt-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0',
      className,
    )}
    {...props}
  />
)

export const H3 = ({ className, ...props }: ComponentProps<'h3'>) => (
  <h3
    className={cn(
      'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
      className,
    )}
    {...props}
  />
)

const isInternal = (href?: string): href is string => !!href?.startsWith('/')

export const SmartLink = ({
  className,
  href,
  children,
  ...props
}: ComponentProps<'a'>) => {
  const classes = cn('font-medium underline underline-offset-4', className)
  if (isInternal(href)) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  )
}

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: ({ className, ...props }: ComponentProps<'h4'>) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: ComponentProps<'h5'>) => (
    <h5
      className={cn(
        'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: ComponentProps<'h6'>) => (
    <h6
      className={cn(
        'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  a: SmartLink,
  p: ({ className, ...props }: ComponentProps<'p'>) => (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentProps<'ul'>) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentProps<'ol'>) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentProps<'li'>) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentProps<'blockquote'>) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: ComponentProps<'img'>) => (
    <img className={cn('rounded-md border', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: ComponentProps<'hr'>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: ComponentProps<'table'>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: ComponentProps<'tr'>) => (
    <tr
      className={cn('m-0 border-t p-0 even:bg-muted', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: ComponentProps<'th'>) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentProps<'td'>) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentProps<'pre'>) => (
    <pre className={cn('mb-4 mt-6 overflow-x-auto', className)} {...props} />
  ),
  code: ({ className, ...props }: ComponentProps<'code'>) => (
    <code
      className={cn(
        'relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className,
      )}
      {...props}
    />
  ),
}

export function Mdx(props: { source: Buffer }) {
  const options: SerializeOptions = {
    mdxOptions: {
      rehypePlugins: [rehypeHighlight],
    },
  }

  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <MDXRemote
        source={props.source}
        components={components}
        options={options}
      />
    </>
  )
}
