/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.pngegg.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
        port: '',
      },
    ],
  },

    async headers() {
      return [
        {
          source: "/login",
          headers: [
            {
              key: "Cross-Origin-Embedder-Policy",
              value: "unsafe-none",
            },
          ],
          
        },
        
      ];
    },
    reactStrictMode: false,
  };

export default nextConfig;
