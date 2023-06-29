const path = require('path');
const { globSync } = require('glob');
const Webpackbar = require('webpackbar');
const pkg = require('../package.json');
const InlineCss = require('./plugin/inline-css');
const EslintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { SRC, PUBLIC, CRX_V3, FIREFOX } = require('./config.json');

const entry = {};
// 基座应用
['app', 'worker', 'polyfill'].map((item) => {
  entry[item] = path.resolve(__dirname, `${SRC}/${item}.ts`);
});
// 插件
globSync('src/widget/*/index.{ts,tsx}').forEach((item) => {
  const keys = item.split('/');
  entry[`${keys[1]}/${keys[2]}`] = path.resolve(__dirname, `../${item}`);
});

module.exports = {
  entry,
  target: 'web',
  devtool: false,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, SRC),
      '@cache': path.resolve(__dirname, '../.cache'),
      '@clever': path.resolve(__dirname, `${SRC}/core/clever`),
      '@compass': path.resolve(__dirname, `${SRC}/core/compass`),
      '@screenshot': path.resolve(__dirname, `${SRC}/core/shot`),
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      chunks: ['app'],
      filename: 'index.html',
      template: path.resolve(__dirname, `${PUBLIC}/template/index.html`),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, `${PUBLIC}/ext`),
          transform(content, path) {
            if (
              path.indexOf('_locales') > 0 &&
              path.endsWith('messages.json')
            ) {
              const data = content.toString();
              const manifest = JSON.parse(data);
              return JSON.stringify(manifest);
            }
            return content;
          },
        },
        {
          from: path.resolve(
            __dirname,
            `${PUBLIC}/manifest${FIREFOX ? '-ff' : ''}${
              CRX_V3 ? '-new' : ''
            }.json`
          ),
          to: 'manifest.json',
          transform(content) {
            const data = content.toString();
            const manifest = JSON.parse(data);
            manifest.version = pkg.version;
            return JSON.stringify(manifest);
          },
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 1000,
      cacheGroups: {
        react: {
          test: /react|react-dom|scheduler|classnames/,
          name: 'widget/react',
          chunks: 'initial',
          priority: -2,
        },
        antd: {
          test: /@emotion\/hash|@emotion\/unitless|stylis|@rc-component|lodash|antd|@ant-design|@ctrl\/tinycolor|node_modules\/rc-*?|async-validator|@babel\/runtime|regenerator-runtime|dom-align|resize-observer-polyfill|copy-to-clipboard|compute-scroll-into-view|scroll-into-view-if-needed|memoize-one|json2mq|string-convert|shallowequal|toggle-selection|[\\/]component\/wrapper[\\/]/,
          name: 'widget/antd',
          chunks: 'initial',
          priority: -3,
        },
        codemirror: {
          test: /codemirror|react-codemirror2/,
          name: 'widget/codemirror',
          chunks: 'initial',
          priority: -4,
        },
        turndown: {
          test: /turndown/,
          name: 'widget/turndown',
          chunks: 'initial',
          priority: -5,
        },
      },
    },
  },
};
