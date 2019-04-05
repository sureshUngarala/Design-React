const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app-bundle.js',
        publicPath: '/' //redirect on manual refresh (client router)
    },
    resolve: {
        alias: {
            Entry: path.resolve(__dirname, 'src/')
        },
        extensions: ['.js', '.tsx', '.ts', '.jsx', '.scss', '.css']  //for resolving module exports without extension
    },
    devServer: {
        historyApiFallback: true,   //redirect on manual refresh (client router)
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
                test: /\.(png|svg)/, loader: 'file-loader', options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/'
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
        new CleanWebpackPlugin(['dist/*']),
        new htmlPlugin({
            template: './src/index.html'
        }),
        new TSLintPlugin({
            files: ['./src/**/*.ts', './src/**/*.tsx']
        }),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/assets/png'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'src/sprites/sprite.png'),
                css: path.resolve(__dirname, 'src/styles/sprite-png.scss')
            },
            apiOptions: {
                cssImageRef: "./sprites/sprite.png"  //path w.r.t where sprites.scss gets imported
            }
        }),
        new SVGSpritemapPlugin('src/assets/svg/*.svg', {    //refer `https://github.com/cascornelissen/svg-spritemap-webpack-plugin/blob/master/docs/options.md`
            output: {
                filename: '../src/sprites/sprite.svg',
                svg: {
                    sizes: false
                },
                svg4everybody: false,    //keeping it false for now, if needed, u know what to do
                svgo: true
            },
            sprite: {
                prefix: false, //for now, no prefix for sprite' name
                generate: {
                    use: true,
                    view: '-fragment',
                    symbol: true
                },
            },
            styles: {
                format: 'fragment',
                filename: path.join(__dirname, 'src/styles/sprite-svg.scss'),
                variables: {    //just variable names in scss created
                    sprites: 'svg-sprites',
                    sizes: 'svg-sizes',
                    variables: 'svg-variables',
                    mixin: 'svg-sprite'
                }
            }
        })
    ]
};