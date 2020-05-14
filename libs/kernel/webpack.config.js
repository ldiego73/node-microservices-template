const path = require('path');
const nodeExternals = require('webpack-node-externals');
const glob = require('glob');

const toObject = paths => {
  var ret = {};

  paths.forEach(path => {
    ret[path.split('/').slice(-1)[0].replace('.ts', '')] = path;
  });

  return ret;
};

const entries = toObject(glob.sync('./src/**/*.ts*'));

module.exports = {
  target: 'node',
  entry: entries,
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: [nodeExternals(), 'uuid', 'fast-deep-equal'],
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  plugins: [],
};
