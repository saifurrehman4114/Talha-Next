/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.colornow.net",
      "firebasestorage.googleapis.com",
      "sambacosmetics.in",
    ],
  },
};

module.exports = nextConfig;
