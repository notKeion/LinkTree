/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*.googleusercontent.com'
      },
      {
        hostname: 'linktree13.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-f72cc81a2e4243baadc95f9e06b271ea.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  }
}

module.exports = nextConfig
