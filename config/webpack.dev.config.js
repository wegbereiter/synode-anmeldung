var config = require('./webpack.config.js');
var webpack = require('webpack');

config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        'ENV': JSON.stringify('develop'),
        'process.env': {
            'NODE_ENV': JSON.stringify('develop'),
        },
    }),
]);

module.exports = config;
