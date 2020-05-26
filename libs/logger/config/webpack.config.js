const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { createConfig } = require('./webpack.base');

const config = createConfig({
  target: 'node',
  entry: './src/logger.ts',
});

const nodeConfig = Object.assign(config, {
  externals: [nodeExternals(), 'chalk', 'dateformat'],
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
});

nodeConfig.module.rules[0].options = {
  configFile: 'tsconfig.build.json',
};

module.exports = nodeConfig;
