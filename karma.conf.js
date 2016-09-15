var webpackConfig = require('./config/webpack.test.js')({env: 'test'});

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'source-map-support'],
        exclude: [],
        files: [
            {pattern: './karma.entry.js', watched: false},
        ],
        preprocessors: {
            './karma.entry.js': ['coverage', 'webpack', 'sourcemap'],
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: 'errors-only',
        },
        webpackServer: {
            stats: 'errors-only',
            noInfo: true,
        },
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {type: 'text-summary'},
                {type: 'json', subdir: '.', file: 'coverage.json'},
            ],
        },
        reporters: ['mocha', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: webpackConfig.LOG_INFO,
        autoWatch: false,
        singleRun: true,
        browsers: ['Chrome'],
    });
};
