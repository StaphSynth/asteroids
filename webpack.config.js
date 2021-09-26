const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',

  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'dev/index.html',
    })
  ],

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)/,
        type: 'asset/resource'
      }
    ],
  },
}
