/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['*'],
  webpackDevMiddleware: {
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 300,
    },
  },
}

export default nextConfig
