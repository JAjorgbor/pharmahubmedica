// @ts-check

const enableAdminSubdomain = process.env.ENABLE_ADMIN_SUBDOMAIN === 'true'
const adminSubdomain = process.env.ADMIN_SUBDOMAIN

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
      {
        protocol: 'https',
        hostname: String(process.env.CLOUDFLARE_HOST_URL),
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ]
  },
  async redirects() {
    if (!enableAdminSubdomain) return []

    return [
      {
        source: '/admin',
        destination: String(adminSubdomain),
        permanent: false,
      },
      {
        source: '/admin/:path*',
        destination: `${adminSubdomain}/:path*`,
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
