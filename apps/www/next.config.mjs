import './env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['lucide-react'],

  // Allow fs
  // webpack(config) {
  //   config.resolve.fallback = { ...config.resolve.fallback, fs: false }
  //   return config
  // },
  experimental: {
    mdxRs: true,
  },
}

export default nextConfig
