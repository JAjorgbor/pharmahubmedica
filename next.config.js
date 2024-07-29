/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [{ key: 'X-Robots-Tag', value: 'index, follow' }],
        },
      ]
    },
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

module.exports = nextConfig
