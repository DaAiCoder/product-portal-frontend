// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    // makes Next.js prefer CommonJS externals
    esmExternals: false,
  },
  webpack(config) {
    // Force Webpack to pick the CJS "main" before the broken ESM "module"
    config.resolve.mainFields = ['main', 'module'];

    // 1) Drop *all* of chrono-node's ESM files (including locales)
    config.module.rules.unshift({
      test: /chrono-node[\/\\]dist[\/\\]esm[\/\\].*\.js$/,
      use: 'null-loader',
    });

    return config;
  },
};

