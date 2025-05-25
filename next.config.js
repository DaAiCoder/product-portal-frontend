// next.config.js
const path = require('path');
const webpack = require('webpack');

/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    esmExternals: false,   // prefer CJS externals
  },
  webpack(config) {
    // 1) Prefer "main" (CJS) over "module" (ESM)
    config.resolve.mainFields = ['main', 'module'];

    // 2) Alias the package root to the CJS build
    config.resolve.alias['chrono-node$'] = path.resolve(
      __dirname,
      'node_modules/chrono-node/dist/chrono-node.js'
    );

    // 3) Also alias any deep esm imports to that same CJS file
    config.resolve.alias['chrono-node/dist/esm'] = path.resolve(
      __dirname,
      'node_modules/chrono-node/dist/chrono-node.js'
    );

    // 4) And catch any locale refiners under esm
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /chrono-node\/dist\/esm\/.*$/,
        resource => {
          resource.request = path.resolve(
            __dirname,
            'node_modules/chrono-node/dist/chrono-node.js'
          );
        }
      )
    );

    return config;
  },
};
