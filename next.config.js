/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disableDevLogs: true,
  customWorkerDir: './helpers/swTest.js',
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
