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
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015', 'stage-2'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    },
    resolveLoader: {
        root: path.resolve(__dirname, '../', 'node_modules')
    },
    plugins: []
}
