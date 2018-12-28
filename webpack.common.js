const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app-bundle.js'
    },
    resolve: {
        alias: {
            Entry: path.resolve(__dirname, 'src/')
        },
        extensions: ['.js', '.tsx', '.ts', '.jsx', '.scss', '.css']  //for resolving module exports without extension
    },
    module: {   //for unbundled files
        rules: [
            { test: /\.(js|jsx|ts|tsx)$/, use: 'babel-loader', exclude: /node_modules/, },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.(js|jsx|ts|tsx)$/, loader: "source-map-loader", enforce: "pre" },
            { test: /\.(ts|tsx)?$/, loader: 'ts-loader', exclude: /node_modules/ },
            {
                test: /\.(woff|woff2)/, loader: 'file-loader', options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            },
            {
                test: /\.(png)/, loader: 'file-loader', options: {
                    name: '[name].[ext]',
                    outputPath: 'png/'
                }
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
        }),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/png'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'src/sprite_png/finance.png'),
                css: path.resolve(__dirname, 'src/sprite_png/finance.scss')
            },
            apiOptions: {
                cssImageRef: "./sprite_png/finance.png"  //path w.r.t where finance.scss gets imported
            }
        })
    ]
};