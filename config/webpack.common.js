const webpack = require('webpack');
const helpers = require('./helper');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

const METADATA = {
    title: 'Angular2 Starter',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
};

module.exports = function (options) {
    return {
        metadata: METADATA,
        entry: {
            app: './src/bootstrap.ts',
            vendor: './src/vendor.ts',
        },
        output: {
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].js',
            path: helpers.root('dist'),

        },
        resolve: {
            extensions: ['', '.ts', '.js', '.json'],
        },
        module: {
            loaders: [
                {
                    test: /\.ts$/,
                    loaders: ['awesome-typescript'],
                    exclude: [/\.(spec|e2e)\.ts$/, /node_modules/]
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    loader: 'file?name=resources/[name].[hash].[ext]'
                },
                {test: /\.json$/, loader: 'json'},
                {test: /\.html$/, loader: 'html', exclude: [helpers.root('src/index.html')]},
                {test: /\.css$/, loaders: ['to-string', 'css']},
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                'ENV': JSON.stringify(options.env),
            }),
            new ForkCheckerPlugin(),
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
};
