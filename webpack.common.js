const path = require('path');
const externals = require('webpack-node-externals');
const NodemonWebpackPlugin = require('nodemon-webpack-plugin');

module.exports = {
  entry: {
    app: './src/server'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'commons'
        }
      }
    }
  },
  plugins: [
    new NodemonWebpackPlugin({ script: './dist/app.bundle.js' })
  ],
  target: 'node',
  externals: [externals()]
};