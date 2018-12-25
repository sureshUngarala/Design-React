const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app-bundle.js'
    },
    module: {   //for unbundled files
        rules: [
            { test: /\.(js|jsx|ts|tsx)$/, use: 'babel-loader', exclude: /node_modules/, },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.(js|jsx|ts|tsx)$/, loader: "source-map-loader", enforce: "pre" },
            { test: /\.(ts|tsx)?$/, loader: 'ts-loader', exclude: /node_modules/ }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   //creating separate bundle node modules
                    chunks: "initial",
                    test: path.resolve(__dirname, "node_modules"),
                    name: "vendor",
                    filename: "vendor.bundle.js",
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
        })
    ]
};