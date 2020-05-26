const path = require('path');
const nodeExternals = require('webpack-node-externals');
const glob = require('glob');

const findFiles = dir => {
  const paths = glob.sync(`${dir}/**/*.ts`);
  const name = path => path.replace(`${dir}/`, '').replace('.ts', '');
  const ret = {};

  paths.forEach(path => {
    ret[name(path)] = path;
  });

  return ret;
};

const entries = findFiles('./src');

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
        options: {
          configFile: 'tsconfig.build.json'
        }
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
