const path = require('path')

// const imageOrigin = process.env.NEXT_PUBLIC_IMAGE_ORIGIN;
// const [protocol, hostname] = /** @type {['http' | 'https', string]} */ (
//   imageOrigin.split("://")
// );

/**
 * @type {import('next').NextConfig}
 *
 */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src')
    return config
  },
  pageExtensions: ['page.tsx'],
  experimental: {
    esmExternals: false,
  },
  redirects: async () => { 
    return [
      { 
        source: '/',
        destination: '/unsanitized-distro/leads',
        permanent: false
      }
    ]
  },
  //this is to ensure to that mistakenly import barrel imports should be transform and load only the needed package
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // images: {
  //   unoptimized: true,
  //   remotePatterns: [
  //     {
  //       protocol,
  //       hostname,
  //     },
  //   ],
  // },
}

module.exports = nextConfig
