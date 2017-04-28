var path = require('path');

var srcdir = path.join(__dirname, '/client/src');
var distdir = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${srcdir}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: distdir
  },
  module: {
    loaders: [
      {
        test : /\.jsx?/,
        include : srcdir,
        loader : 'babel-loader',      
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};