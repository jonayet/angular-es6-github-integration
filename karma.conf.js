// Karma configuration
// Generated on Sat Oct 29 2016 13:25:03 GMT+0600 (BDT)
var webpackConfig = require('./webpack.config');

module.exports = function(config) {
    config.set({
        basePath: '',
        files: [
            'test-vendors.js',
            'app/**/*-test.js'
        ],
        preprocessors: {
            'test-vendors.js': ['webpack', 'sourcemap'],
            'app/*/*-test.js': ['webpack', 'sourcemap']
        },
        exclude: [ ],
        autoWatch: true,
        autoWatchBatchDelay: 1000,
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        webpack: {
            module: webpackConfig.module
        },
        webpackMiddleware: {
            noInfo: true,
            stats: 'errors-only',
        },
        reporters: ['progress'],
        colors: true,
        port: 9876,
        logLevel: config.LOG_ERROR,
        singleRun: false,
        concurrency: Infinity
    })
};
