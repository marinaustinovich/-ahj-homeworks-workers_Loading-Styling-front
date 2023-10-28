const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');
const { GenerateSW } = require('workbox-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({}),
      new CssMinimizerWebpackPlugin({ test: /\.foo\.css$/i }),
    ],
  },
  plugins: [
    new GenerateSW({
      swDest: 'service.worker.js',
      clientsClaim: true,
      skipWaiting: true,
      cacheId: 'ahj-v2',
    }),
  ],
});
