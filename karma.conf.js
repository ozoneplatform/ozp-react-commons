'use strict';

var webpack = require("webpack");

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha'],
        files: [
            // including es5-shim for PhantomJS
            // 'node_modules/es5-shim/es5-shim.js',
            'node_modules/phantomjs-polyfill/bind-polyfill.js',
            'app/OzoneConfig.js', //default configs
            'app/js/__tests__/main.js'
        ],
        preprocessors: {
            'app/js/__tests__/main.js': ['webpack']
        },
        webpack: {
            cache: true,
            resolve: {
                alias: {
                    react$: "react/addons",
                    bootstrap$: "bootstrap-sass/assets/javascripts/bootstrap",
                    jquery$: "jquery/dist/jquery"
                },
                // Configure webpack to look for required files in bower and node
                modulesDirectories: ['./node_modules']
            },
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        loader: "jsx-loader?harmony=true&insertPragma=React.DOM",
                        exclude: /node_modules|bower_components|gulp|dist/
                    }],
                noParse: /\.min\.js/
            }
        },
        webpackServer: {
            stats: {
                colors: true
            }
        },
        exclude: [],
        port: 8080,
        logLevel: config.LOG_INFO,
        colors: true,
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],
        reporters: ['mocha'],
        captureTimeout: 60000,
        browserNoActivityTimeout: 60000,
        singleRun: true,
        plugins: [
            'karma-jasmine',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-webpack',
            'karma-mocha'
        ]

    });
};
