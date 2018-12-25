const merge = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'production',
    devtool: "source-map",
    module: {   //for unbundled files
        rules: [
            {
                test: /\.(css|scss)$/, use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    plugins: [  //for bundled files
        new MiniCssExtractPlugin({  //doesn't work without 'MiniCssExtractPlugin.loader'. So, works only in prod mode.
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        })
    ]
});