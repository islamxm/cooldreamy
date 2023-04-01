/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone', //ftp
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
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
}

module.exports = nextConfig
