const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

//run with --mode=production/development flag in npm scripts
module.exports = (env, args) => {
    const devMode = args.mode === 'development';
    console.log('devMode ' + devMode);
    return {
        entry: "./src/index.tsx",
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app-bundle.js'
        },
        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",
        module: {   //for unbundled files
            rules: [
                { test: /\.(js|jsx|ts|tsx)$/, use: 'babel-loader', exclude: /node_modules/, },
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { test: /\.(js|jsx|ts|tsx)$/, loader: "source-map-loader", enforce: "pre" },
                { test: /\.(ts|tsx)?$/, loader: 'ts-loader', exclude: /node_modules/ },
                {
                    test: /\.(css|scss)$/, use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                }
            ]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {   //creating separate bundle node modules
                        chunks: "initial",
                        test: path.resolve(__dirname, "node_modules"),
                        name: "vendor",
                        filename:"vendor.bundle.js",
                        enforce: true,
                    }
                }
            }
        },
        plugins: [  //for bundled files
            new CleanWebpackPlugin(['dist/*.*']),
            new htmlPlugin({
                template: './src/index.html'
            }),
            new TSLintPlugin({
                files: ['./src/**/*.ts', './src/**/*.tsx']
            }),
            new MiniCssExtractPlugin({  //doesn't work without 'MiniCssExtractPlugin.loader'. So, works only in prod mode.
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css',
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static'
            })
        ]
    };
}