/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disableDevLogs: true,
  // disable: process.env.NODE_ENV === 'development'
})

const nextConfig = withPWA({
  reactStrictMode: false,
  compiler: {
    styledComponents: true
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  
})

module.exports = nextConfig
