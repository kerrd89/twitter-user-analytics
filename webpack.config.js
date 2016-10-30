process.env['NODE_ENV'] = 'development';
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      { test: /\.css$/, loader: 'css-loader' },
      { test: /\.scss$/, loader: 'style!css!sass' },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
  },
};
