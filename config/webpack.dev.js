const helpers = require('./helper');
const merge = require('webpack-merge');
const webpack = require('webpack');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const config = require('./webpack.common.js')({env: ENV});

module.exports = function(options) {
    return merge(config, {
        metadata: {
            host: HOST,
            port: PORT,
            ENV: ENV,
        },
        debug: true,
        devtool: 'cheap-module-source-map',

        plugins: [
            new webpack.NamedModulesPlugin(),

        ],
        tslint: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: 'src'
        },
        devServer: {
            port: PORT,
            host: HOST,
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            outputPath: helpers.root('dist')
        },
    });
};
