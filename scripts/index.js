const fs = require('fs');
const path = require('path');
const Webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpackConfig = require('./webpack');

const debug = process.env.DEBUG === 'TRUE';

webpackConfig.mode = debug ? 'development' : 'production';

if (!debug) {
  webpackConfig.optimization = {
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
  };
}

if (!webpackConfig.entry) {
  ['app.tsx', 'app.ts', 'app.class.ts'].forEach((key) => {
    if (webpackConfig.entry) {
      return;
    }
    const entry = path.join(__dirname, `../src/${key}`);
    if (fs.existsSync(entry)) {
      webpackConfig.entry = entry;
    }
  });
}

const compiler = Webpack(webpackConfig);

// `compiler.outputPath` is safe, even if user webpack config `output.path` is not set.
if (fs.existsSync(compiler.outputPath)) {
  fs.rmSync(compiler.outputPath, { recursive: true });
}

if (debug) {
  const watching = compiler.watch(
    {
      // Example
      aggregateTimeout: 300,
      poll: undefined,
    },
    (err, stats) => {
      if (err) {
        console.error(err);
      } else {
        process.stdout.write(
          `${stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
          })}\n\n`
        );
        if (stats.hasErrors()) {
          console.error('Build failed with errors.');
        }
      }
    }
  );
  process.on('SIGINT', () => {
    watching.close(() => {
      process.exit();
    });
  });
} else {
  compiler.run((err, stats) => {
    if (err) {
      console.error(err);
    } else {
      process.stdout.write(
        `${stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false,
        })}\n\n`
      );
      if (stats.hasErrors()) {
        console.error('Build failed with errors.');
      }
    }
    compiler.close((closeErr) => {
      console.error(closeErr);
    });
  });
  process.on('SIGINT', () => {
    compiler.close(() => {
      process.exit();
    });
  });
}
