/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})


const nextConfig = withPWA({
  // output: 'standalone', //ftp
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  // output: 'export',
  // images: {
  //   unoptimized: true
  // },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  }
  // images: { //ftp
  //   unoptimized: true
  // }
  // images: {
  //   formats: ['image/png', 'image/jpg'],
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'zamanilka.ru',
  //       port: '',
  //       pathname: '/wp-content/uploads/**',
  //     },
  //   ],
  // },
})


module.exports = nextConfig
