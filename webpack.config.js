/**
 * Created by jonayet on 10/28/16.
 */

'use strict';

module.exports = {
    entry: {
        javascript: "./app/app.main.js",
        html: "./index.html"
    },
    output: {
        path: 'build',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015'
            },
            {
                test: /index\.html$/,
                exclude: /node_modules/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\.view\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            }
        ]
    },
    devtool: "source-map"
};