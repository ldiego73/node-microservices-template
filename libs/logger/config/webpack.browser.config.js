const path = require('path');
const { createConfig } = require('./webpack.base');

const config = createConfig({
  target: 'web',
  entry: './src/logger.browser.ts',
});

const webConfig = Object.assign(config, {
  output: {
    path: path.resolve(__dirname, '../lib/browser'),
    filename: '[name].js',
    libraryTarget: 'window',
  },
});

webConfig.module.rules[0].options = {
  configFile: 'tsconfig.build.browser.json',
};

module.exports = webConfig;
