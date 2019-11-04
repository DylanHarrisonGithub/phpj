const path = require('path');

module.exports = {
  entry: './phpj/engine/src/phpj.js',
  output: {
    filename: 'phpj.js',
    path: path.resolve(__dirname, 'phpj/engine')
  },
};