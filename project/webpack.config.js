var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: './src',
    entry: './js/entry.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: []
    },
    plugins: []
}
