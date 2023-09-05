/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})


const nextConfig = withPWA({
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  }
})


module.exports = nextConfig
