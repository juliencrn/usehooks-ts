import './env.js'

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

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return deletedHooks.map(slug => ({
      source: `/react-hook/${slug}`,
      destination: '/migrate-to-v3#removed-hooks',
      permanent: true,
    }))
  },
}

export default nextConfig
