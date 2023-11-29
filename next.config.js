/** @type {import('next').NextConfig} */
const nextConfig = {  
  webpack: (config) => {
      config.externals = [...config.externals, 'bcrypt'];
      return config;
    },
    images: {
      domains: ['files.edgestore.dev'],
    },
}

module.exports = nextConfig
