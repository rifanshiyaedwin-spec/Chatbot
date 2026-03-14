import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    turbopack: {
      resolveAlias: {
        '@/*': path.resolve(new URL('.', import.meta.url).pathname, './*'),
      },
    },
  },
}

export default nextConfig
