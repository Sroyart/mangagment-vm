/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  reactStrictMode: true,
  env: {
    API_PORT: process.env.API_PORT,
  },
};
