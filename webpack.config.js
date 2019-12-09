const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, options) => {
  
  const isProd = !(options.mode === 'development')
  
  return {
    mode: isProd?'production':'development',
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    plugins: isProd?[
      new VueLoaderPlugin(),
      new ExtractTextPlugin("style.css"),
      new HtmlWebpackPlugin({
        template: './template.html',
        "head": {
          "entry": "bundle.js",
          "css": [ "style.css" ]
        },
      })
    ]:[
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: './template.html',
        "head": {
          "entry": "bundle.js",
        },
      })
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    module: {
      noParse: /es6-promise\.js$/, // avoid webpack shimming process
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
          loader: 'file-loader',
          options:{
            publicPath: ''
          }
          },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[ext]?[hash]'
          }
        },
        {
          test: /\.css$/,
          use: isProd
            ? ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'vue-style-loader'
              })
            : ['vue-style-loader', 'css-loader']
        }
      ]
    }
  }
}
