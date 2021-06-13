const webpack = require('webpack');
const nrwlConfig = require('@nrwl/react/plugins/webpack.js');

module.exports = (config, _context) => {
  nrwlConfig(config);
  return {
    ...config,
    plugins: [
      ...config.plugins,
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
  };
};
