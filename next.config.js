/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }


module.exports = {
  output: 'export',
  images: {
    domains: ['courses-top.ru']
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

// module.exports = nextConfig
