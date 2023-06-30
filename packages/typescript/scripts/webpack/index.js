const path = require('path');
const Webpackbar = require('webpackbar');
// const HotReload = require('./plugin/hot-reload');
const EslintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InlineCss = require('./plugins/inline-css');

module.exports = {
  target: 'web',
  externals: {
    antd: 'antd',
    react: 'React',
    'react-dom': 'ReactDOM',
    classnames: 'classnames',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          'ts-loader',
        ],
        exclude: /node_modules/,
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
    new InlineCss(),
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
