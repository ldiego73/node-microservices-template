const createConfig = ({ target, entry }) => ({
  target,
  entry: {
    logger: entry,
  },
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
  plugins: [],
});

module.exports = { createConfig };
