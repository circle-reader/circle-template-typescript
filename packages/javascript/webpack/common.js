const path = require('path');
const Webpackbar = require('webpackbar');
const EslintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InlineStyle = require('./inline-style');

module.exports = {
  target: 'web',
  devtool: false,
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    classnames: 'classnames',
    'circle-cts': 'circleCts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new Webpackbar(),
    new InlineStyle(),
    new EslintPlugin({
      cache: true,
    }),
    new StylelintPlugin({
      fix: true,
      context: './src',
      extensions: ['css', 'less'],
    }),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
    }),
  ],
};
