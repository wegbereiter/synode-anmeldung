var pathUtil = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

function root() {
    var path = Array.prototype.slice.call(arguments);
    path.unshift('..');
    path.unshift(__dirname);
    return pathUtil.join.apply(pathUtil, path);
}

module.exports = {
    entry: {
        app: './src/bootstrap.ts',
        vendor: './src/vendor.ts',
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: root('dist'),

    },
    devtool: 'eval-source-map', // 'source-map',
    debug: true,
    resolve: {
        extensions: ['', '.ts', '.js', '.json'],
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript'],
                excludes: [/\.(spec|e2e)\.ts$/, /node_modules/]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=resources/[name].[hash].[ext]'
            },
            {test: /\.json$/, loader: 'json'},
            {test: /\.html$/, loader: 'html?minimize=false'},
            {test: /\.css$/, loader: 'raw'},
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunksSortMode: 'dependency',
        }),
        new webpack.optimize.CommonsChunkPlugin({
             name: ['vendor'],
        }),
    ],
    devServer: {
        contentBase: './src',
        historyApiFallback: true,
        stats: 'minimal', // none (or false), errors-only, minimal, normal (or true) and verbose
    },
};
