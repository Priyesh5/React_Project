// 1.
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const path = require('path');
// 2.
const config = {
    // 2.a
    entry: './main.js',
    // 2.b
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
    },
    // 2.c
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ],
    },
    // 2.d
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    // 2.e
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: HtmlWebpackTemplate,
            appMountId: 'app',
        }),
    ],
};
// 3.
module.exports = config;