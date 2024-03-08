import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const deletedHooks = [
  'use-debounce',
  'use-effect-once',
  'use-element-size',
  'use-fetch',
  'use-image-on-load',
  'use-is-first-render',
  'use-locked-body',
  'use-update-effect',
]
const deletedHookPaths = deletedHooks.map(slug => `/react-hook/${slug}`)

export function middleware(request: NextRequest) {
  // Redirect deleted hooks to the migration guide
  if (deletedHookPaths.includes(request.nextUrl.pathname)) {
    const newUrl = new URL(`/migrate-to-v3`, request.url)
    newUrl.hash = 'removed-hooks'
    return NextResponse.redirect(newUrl, {
      status: 301,
    })
  }
}

export const config = {
  matcher: ['/react-hook/:path*'],
}
