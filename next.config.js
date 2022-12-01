/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.filestackcontent.com"],
  },
}

module.exports = nextConfig
