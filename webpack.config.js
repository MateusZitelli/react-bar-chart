'use strict';
var webpack = require('webpack');

var IS_PRODUCTION = 'production' === process.env.NODE_ENV;

var webpackConfig = module.exports = {
  entry: __dirname + "/src/BarChart.jsx",
  output: {
    path: __dirname + '/lib',
    filename: 'react-bar-chart.js',
    library: 'BarChart',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    d3: {
      root: 'd3',
      commonjs: 'd3',
      commonjs2: 'd3',
      amd: 'd3'
    }
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader?stage=0',
        exclude: 'node_modules'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  resolve: {
    moduleDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.es6']
  },
  plugins: [
    new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
    }
  })
  ]
};

if(IS_PRODUCTION){
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()
  );

  webpackConfig.output.filename = 'react-bar-chart.min.js';
}
