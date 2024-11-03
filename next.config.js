/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable SWC and use Babel instead
  experimental: {
    forceSwcTransforms: false,
  },
  // Disable image optimization
  images: {
    unoptimized: true,
  },
  // Enable static exports
  output: 'standalone',
}

module.exports = nextConfig;