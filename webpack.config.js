const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'source-map' : false,
  context: __dirname,
  entry: './src',
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css']
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hot: isDevelopment
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: true,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]'
              },
              localsConvention: 'camelCaseOnly',
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              exclude: /node_modules/
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      minify: !isDevelopment,
      hash: !isDevelopment
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/favicon.png')
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    })
  ],
  optimization: {
    minimizer: isDevelopment ? [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})] : []
  }
}
