// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  // Ensure Next.js uses CJS externals
  experimental: {
    esmExternals: false,
  },
  webpack(config) {
    // Alias all "chrono-node" imports to its CJS build:
    config.resolve.alias['chrono-node'] = path.resolve(
      __dirname,
      'node_modules/chrono-node/dist/chrono-node.js'
    );
    return config;
  },
};
