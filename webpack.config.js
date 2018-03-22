const path = require('path');

module.exports = {
  entry: './src/arkanoid.js',
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
