const helpers = require('./helper');
const webpack = require('webpack');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = function(options) {
    return {
        devtool: 'inline-source-map',
        resolve: {
            extensions: ['', '.ts', '.js'],
            root: helpers.root('src'),
        },
        module: {
            preLoaders: [
                {
                    test: /\.ts$/,
                    loader: 'tslint',
                    exclude: [helpers.root('node_modules')]
                },
                {
                    test: /\.js$/,
                    loader: 'source-map',
                    exclude: [
                        // these packages have problems with their sourcemaps
                        helpers.root('node_modules/rxjs'),
                        helpers.root('node_modules/@angular')
                    ]}

            ],
            loaders: [
                {
                    test: /\.ts$/,
                    loaders: ['awesome-typescript'],
                    query: {
                        sourceMap: false,
                        inlineSourceMap: true
                    },
                    exclude: [/\.e2e\.ts$/]
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    loader: 'file?name=resources/[name].[hash].[ext]'
                },

                {test: /\.json$/, loader: 'json'},
                {test: /\.html$/, loader: 'html', exclude: [helpers.root('src/index.html')]},
                {test: /\.css$/, loaders: ['to-string', 'css']},

            ],
            postLoaders: [
                {
                    test: /\.(js|ts)$/, loader: 'istanbul-instrumenter',
                    include: helpers.root('src'),
                    exclude: [
                        /\.(e2e|spec)\.ts$/,
                        /node_modules/
                    ]
                }

            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'ENV': JSON.stringify(ENV),
            }),
        ],
        tslint: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: 'src'
        },
    };
};
