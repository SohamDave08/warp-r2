/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'warp-documents-public.s3.amazonaws.com'
      }
    ],
  }
};

export default nextConfig;
