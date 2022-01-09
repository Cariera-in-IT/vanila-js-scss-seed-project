const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
dotenv.config();
var globule = require('globule');
var filepaths = globule.find('src/**/*.html');
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin');

let multipleHtmlPlugins = filepaths.map(path => {
    const relativePath = path.replace(/^src\//, '');
    return new HtmlWebpackPlugin({
        template: `./${relativePath}`, // relative path to the HTML files
        filename: relativePath, // output HTML files
        chunks: [relativePath], // respective JS files
    })
});

module.exports = {
    mode: "development",
    context: path.resolve(__dirname, 'src'),

    devtool: "eval-source-map",
    entry: [`./js/main.js`, './styles/main.scss'],

    output: {
        filename: "scripts.js",
        path: path.resolve(__dirname, `./docs`)
    },
    devServer: {

        contentBase: path.join(__dirname, `./src`),
        publicPath: "/",
        compress: false,
        port: 3001,
        open: ['/'],
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                "presets": [
                    "@babel/preset-env"
                ],
                "plugins": [
                    ["@babel/transform-runtime"]
                ],
                sourceMap: true
            }
        }, {
            test: /\.(html?)$/,
            loader: 'html-loader',
            options: {
                attributes: {
                    list: [
                        '...',
                        {
                            tag: 'img',
                            attribute: 'data-src',
                            type: 'src',
                        },
                        {
                            tag: 'source',
                            attribute: 'srcset',
                            type: 'srcset',
                        },
                        {
                            tag: 'img',
                            attribute: 'data-srcset',
                            type: 'srcset',
                        },
                    ],
                    urlFilter: (attribute, value, resourcePath) => {
                        return !/\.(js|css|scss)$/.test(value);

                    },
                    root: path.resolve(__dirname, 'src'),
                },
            },
        }, {
            test: /\.scss$/,
            use: [
                // fallback to style-loader in development
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ],
        }, {
            test: /\.(svg|png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
                name: '[path][name]-[hash].[ext]',
                outputPath: '', // file pack output path, is relative path for `dist`
                publicPath: '/', // css file will use, is absolute path for server
            }
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        ...multipleHtmlPlugins,
        new BaseHrefWebpackPlugin({baseHref: process.env.BASE_HREF})
    ]
};
