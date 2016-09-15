const merge = require('webpack-merge');
const webpack = require('webpack');

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

const config = require('./webpack.common.js')({env: ENV});

module.exports = function(options) {
    return merge(config, {
        debug: false,
        devtool: 'source-map',
        metadata: {
            host: HOST,
            port: PORT,
            ENV: ENV,
        },
        plugins: [
            //new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                // beautify: true, //debug
                // mangle: false, //debug
                // dead_code: false, //debug
                // unused: false, //debug
                // deadCode: false, //debug
                // compress: {
                //   screw_ie8: true,
                //   keep_fnames: true,
                //   drop_debugger: false,
                //   dead_code: false,
                //   unused: false
                // }, // debug
                // comments: true, //debug

                beautify: false, //prod
                mangle: { screw_ie8 : true, keep_fnames: true }, //prod
                compress: { screw_ie8: true }, //prod
                comments: false //prod
            }),
        ],
        tslint: {
            emitErrors: true,
            failOnHint: true,
            resourcePath: 'src'
        },
        htmlLoader: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
            customAttrSurround: [
                [/#/, /(?:)/],
                [/\*/, /(?:)/],
                [/\[?\(?/, /(?:)/]
            ],
            customAttrAssign: [/\)?\]?=/]
        },
    });
};
