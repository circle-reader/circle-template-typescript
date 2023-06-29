const path = require('path');
const Webpack = require('webpack');
const common = require('./common');
const pkg = require('../package.json');
const webpackMerge = require('webpack-merge');
const ZipPlugin = require('zip-webpack-plugin');
const Obfuscator = require('./plugin/obfuscator');
const TerserPlugin = require('terser-webpack-plugin');
const { PROD, FIREFOX, ZIP, CRX_V3 } = require('./config.json');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = webpackMerge.merge(common, {
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, PROD),
    publicPath: '/',
  },
  plugins: [
    new Obfuscator(),
    new Webpack.DefinePlugin({
      DEBUG: JSON.stringify(false),
      CRX_V3: JSON.stringify(CRX_V3),
    }),
    new ZipPlugin({
      path: path.resolve(__dirname, ZIP),
      filename: `${pkg.name}_v${pkg.version}${FIREFOX ? '_for_firefox' : ''}`,
      extension: 'zip',
      fileOptions: {
        mtime: new Date(),
        mode: 0o100664,
        compress: true,
        forceZip64Format: false,
      },
      zipOptions: {
        forceZip64Format: false,
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          ecma: 6,
          compress: true,
          output: {
            comments: false,
            beautify: false,
          },
        },
        parallel: true,
        extractComments: false,
      }),
    ],
  },
});
