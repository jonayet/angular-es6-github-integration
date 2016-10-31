/**
 * Created by jonayet on 10/28/16.
 */
var webpack = require("webpack");

'use strict';

module.exports = {
    entry: {
        app: "./app/app.main.js",
        vendors: "./vendors.js"
    },
    output: {
        path: 'build',
        publicPath: "build",
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015'
            },
            {
                test: /\.view\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    ],
    devtool: "source-map"
};