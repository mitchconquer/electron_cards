/**
 * Base webpack config used across other specific configs
 */

import path from 'path'
import validate from 'webpack-validator'
import fs from 'fs'

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(x => (
    ['.bin'].indexOf(x) === -1
  ))
  .forEach(mod => {
    nodeModules[mod] = `commonjs ${mod}`
  })

export default validate({
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        plugins: ['transform-decorators-legacy'],
        presets: ['es2015', 'stage-0', 'react']
      }
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
    alias: {
      'fluent-ffmpeg': 'fluent-ffmpeg/lib/fluent-ffmpeg.js'
    }
  },

  plugins: [],

  externals: {
    ...nodeModules,
    bootstrap: 'bootstrap'
  }
})
