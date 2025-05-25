// next.config.js
const webpack = require('webpack');

/** @type {import('next').NextConfig} */
module.exports = {
  experimental: { esmExternals: false },
  webpack(config) {
    // Tell Webpack to prefer the "main" (CJS) field
    config.resolve.mainFields = ['main', 'module'];

    // Replace any import of chrono-node/dist/esm/locales/... with the base chrono-node CJS
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /chrono-node\/dist\/esm\/locales\/.*\.js$/,
        'chrono-node'
      )
    );

    return config;
  },
};
