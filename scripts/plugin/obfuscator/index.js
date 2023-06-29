const webpack = require('webpack');
const { RawSource } = require('webpack-sources');
const JavaScriptObfuscator = require('javascript-obfuscator');

class Obfuscator {
  apply(compiler) {
    compiler.hooks.compilation.tap('obfuscator', (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: 'obfuscator-assets',
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        (_, callback) => {
          const { assets } = compilation;
          Object.keys(assets).forEach((key) => {
            if (!key.startsWith('widget/parser')) {
              return;
            }
            const value = assets[key];
            const obfuscationResult = JavaScriptObfuscator.obfuscate(
              value.source(),
              {
                selfDefending: true,
              }
            );
            assets[key] = new RawSource(obfuscationResult.getObfuscatedCode());
          });
          callback();
        }
      );
    });
  }
}

module.exports = Obfuscator;
