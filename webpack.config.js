(function () {

  'use strict';

  var path = require('path');
  var webpack = require('webpack');
  var defaultConfig = require('./config/defaults');
  var srcPath = defaultConfig.srcPath;

  //Plugin list:
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var CopyWebpackPlugin = require('copy-webpack-plugin');
  var PurifyCSSPlugin = require('purifycss-webpack-plugin');
  var ImageminPlugin = require('imagemin-webpack-plugin').default;


  //Main config:
  module.exports = {
    context: srcPath,
    entry: [
      'webpack-dev-server/client?http://localhost:' + defaultConfig.port,
      'webpack/hot/only-dev-server',
      './scripts/main'
    ],
    output: {
      path: './dist/',
      filename: "scripts/[name]_[hash].js",
      chunkFilename: "scripts/[id]_[hash].js"
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader' // 'babel-loader' is also a legal name to reference
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!sass-loader")
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(png|jpe?g|eot|svg|ttf|woff2?)$/,
          loader: "file-loader?name=[path][name].[hash].[ext]"
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin('styles/[name]_[hash].css', {
        publicPath: '/styles/'
      }),
      new PurifyCSSPlugin({
        paths: [
          'index.html'
        ],
        purifyOptions: {
          minify: true,
          info: true
        }
      }),
      new HtmlWebpackPlugin({
        title: 'Fei Webpack App',
        template: 'index.html',
        filename: 'index.html',
        hash: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
      }),
      new ImageminPlugin({
        root: 'assets',
        disable: false,
        optipng: {
          optimizationLevel: 3
        },
        gifsicle: {
          optimizationLevel: 1
        },
        jpegtran: {
          progressive: false
        },
        svgo: {},
        pngquant: {
          quality: '95-100'
        }
      })
    ]
  };

}());
