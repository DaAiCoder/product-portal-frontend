// next.config.js
const webpack = require('webpack');

module.exports = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      stream: require.resolve('stream-browserify'),
    };

    return config;
  },
};



