/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', //ftp
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: { //ftp
    unoptimized: true
  }
}

module.exports = nextConfig
