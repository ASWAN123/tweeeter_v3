/** @type {import('next').NextConfig} */
const nextConfig = {  
  webpack: (config) => {
      config.externals = [...config.externals, 'bcrypt'];
      return config;
    },
    images: {
      // domains: ['files.edgestore.dev'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'files.edgestore.dev',
          pathname: '**',
        },
      ],
    },

}

module.exports = nextConfig
