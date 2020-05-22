const path = require('path');
const nodeExternals = require('webpack-node-externals');
const glob = require('glob');
const tsconfig = require('./tsconfig.json');

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

const aliases = Object.keys(tsconfig.compilerOptions.paths).reduce(
  (aliases, aliasName) => {
    const name = aliasName.replace('/*', '');
    const basePath = tsconfig.compilerOptions.paths[aliasName][0].replace(
      '*',
      ''
    );

    aliases[name] = path.resolve(__dirname, `src/${basePath}`);

    return aliases;
  },
  {}
);

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
    alias: aliases,
  },
  externals: [
    nodeExternals(),
    '@micro/kernel',
    '@micro/logger',
    'sequelize',
    'sqlite3',
  ],
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  plugins: [],
};
