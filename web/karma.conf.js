var webpack = require('webpack')

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'], //run in Chrome
    browserNoActivityTimeout: 60000,
    singleRun: true, //just run once by default
    frameworks: ['mocha'], //use the mocha test framework
    files: [
      'spec/tests.webpack.js' //just load this file
    ],
    preprocessors: {
      'spec/tests.webpack.js': ['webpack', 'sourcemap'], //preprocess with webpack and our sourcemap loader
    },
    reporters: ['nyan'], //report results in this format
    mochaReporter: {
      output: 'autowatch'
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            exclude: /node_modules/,
            test: /\.jsx?$/,
            loader: 'babel-loader'}
        ]
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
