var config = require('./webpack.config.js');
var webpack = require('webpack');

config.devtool = 'source-map';
config.debug = false;

config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        'ENV': JSON.stringify('production'),
        'process.env': {
            'NODE_ENV': JSON.stringify('production'),
        },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: { screw_ie8 : true, keep_fnames: true },
        compress: { screw_ie8: true },
        comments: false,
    }),
]);

module.exports = config;
