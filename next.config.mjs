/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['https://c10.patreonusercontent.com']
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
};

export default nextConfig;
