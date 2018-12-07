const webpack = require('webpack')
const path = require('path')
// 终端中更加友好的webapck运行的警告和错误
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const { dependencies } = require('../package.json')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  name: 'api', // 配置名称。加载多个配置时使用
  target: 'node', // 指示 webpack 特定环境
  devtool: '#cheap-module-source-map',
  mode: isProd ? 'production' : 'development',
  entry: path.join(__dirname, '../src/api/app.js'),
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../dist/api'),
    filename: 'api.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src/web'),
      '~': path.join(__dirname, '../src/api')
    },
    extensions: ['.js']
  },
  externals: [
    ...Object.keys(dependencies || {})
  ],
  module: {
    rules: [{
      test: /\.(js)$/,
      include: [path.resolve(__dirname, '../src/api')],
      exclude: /(node_modules|bower_components)/
    }]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.API_ENV': '"server"'
    })
  ]
}