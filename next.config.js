/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.filestackcontent.com"],
  },
  productionBrowserSourceMaps: process.env.SOURCE_MAPS == "true",
}

module.exports = nextConfig
