var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: './src',
    entry: {
        'index': './js/index.js',
        'lib/prism': './js/lib/prism.js'
    },
    output: {
        path:__dirname,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015', 'stage-2']
                }
            }
        ]
    },
    resolveLoader: {
        root: path.resolve(__dirname, '../', 'node_modules')
    },
    plugins: []
}
