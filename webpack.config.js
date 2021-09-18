const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: 'development',

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'dev/index.html',
    })
  ]
}
