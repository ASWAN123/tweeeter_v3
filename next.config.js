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
    typescript: {
      ignoreBuildErrors: true,
   },
   reactStrictMode: true,
   swcMinify: true,
   env: {
     NEXTAUTH_URL: process.env.NEXTAUTH_URL,
     NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
   }

}

module.exports = nextConfig
