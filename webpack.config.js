const path = require('path')

module.exports = {
  target: "webworker",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "lightning-fs.min.js",
    library: "LightningFS",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
};
