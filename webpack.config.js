const dotenv = require('dotenv');
dotenv.config();

const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const globule = require('globule');
const filepaths = globule.find('src/**/*.html');
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin');

const baseHref = process.env.WEBPACK_DEV_SERVER ? '/' : process.env.BASE_HREF;

let multipleHtmlPlugins = filepaths.map(path => {
    const relativePath = path.replace(/^src\//, '');
    return new HtmlWebpackPlugin({
        template: `./${relativePath}`, // relative path to the HTML files
        filename: relativePath, // output HTML files
        chunks: [relativePath], // respective JS files
    })
});

const absoluteSrc = path.resolve(__dirname, `./src`)

module.exports = {
    mode: "development",
    context: absoluteSrc,
    devtool: "eval-source-map",
    entry: [`./js/main.js`, './styles/main.scss'],
    output: {
        filename: "scripts.js",
        path: path.resolve(__dirname, `./docs`),
        // publicPath: baseHref
    },
    devServer: {
        contentBase: absoluteSrc,
        // publicPath: baseHref,
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
                    urlFilter: (attribute, value) => {
                        return !/\.(js|css|scss)$/.test(value);

                    },
                    root: absoluteSrc,
                },
            },
        }, {
            test: /\.html$/,
            loader: 'string-replace-loader',
            options: {
                multiple: [
                    {search: 'src="/scripts.js"', replace: `src="${baseHref}scripts.js"`},
                    {search: 'href="/style.css"', replace: `href="${baseHref}style.css"`},
                ]
            }
        }, {
            test: /\.scss$/,
            use: [
                // fallback to style-loader in development
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ],
        }, {
            test: /\.(svg|png|jpe?g|gif|webp|mp\D)$/i,
            loader: 'file-loader',
            options: {
                name: '[path][name]-[hash].[ext]',
                outputPath: '', // file pack output path, is relative path for `dist`
                publicPath: baseHref, // css file will use, is absolute path for server
            }
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `style.css`,
        }),
        ...multipleHtmlPlugins,
        new BaseHrefWebpackPlugin({baseHref})
    ]
};
