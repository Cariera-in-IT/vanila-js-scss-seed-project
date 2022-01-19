const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const globule = require('globule');
const filepaths = globule.find('src/**/*.html');
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin');
const openBrowser = require('react-dev-utils/openBrowser');
const { execSync } = require('child_process');

const gitRemote = execSync('git remote get-url origin', { encoding: 'utf8' });
const gitSearch = /(git@|https:\/\/)([\w\.@]+)(\/|:)([\w,\-,\_]+)\/([\w,\-,\_]+)(.git){0,1}((\/){0,1})/

const repositoryName = gitRemote && gitRemote.match(gitSearch) && gitRemote.match(gitSearch)[5]
const gitUserName = gitRemote && gitRemote.match(gitSearch) && gitRemote.match(gitSearch)[4]
const baseHref = process.env.WEBPACK_SERVE || !repositoryName ? '/' : `/${repositoryName}/`;
console.log('Your github pages url should:', `https://${gitUserName}.github.io/${repositoryName}/`)
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
    devtool: "eval",
    entry: [`./js/main.js`, './styles/main.scss'],
    output: {
        filename: "scripts.js",
        path: path.resolve(__dirname, `./docs`),
        publicPath: baseHref,
        assetModuleFilename: '[path][name][ext]'

    },
    // resolve: {
    //     extensions: ['.js', '.json', '.scss', '.jpg'],
    //     aliasFields: ['browser'],
    //     alias: {
    //         assets: path.join(absoluteSrc, '/assets/')
    //     },
    //     roots: [absoluteSrc, '.', path.join(absoluteSrc, '/assets/')],
    // },
    devServer: {
        // static: {
        //     directory: path.join(__dirname, 'public'),
        // },
        // contentBase: absoluteSrc,
        // publicPath: baseHref,
        compress: false,
        port: 42042,
        // open: ['/'],
        onAfterSetupMiddleware: () => {
            openBrowser("http://localhost:42042");
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(html?)$/,
                loader: 'html-loader',
                options: {
                    sources: {
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
                            console.log('{attribute, value}', {attribute, value})
                            return !/\.(js|css|scss)$/.test(value);
                        },
                    },
                },
            }, {
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
                    // sourceMap: true
                }
            }, {
                test: /\.s?css$/,
                use: [
                    // fallback to style-loader in development
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }, {
                test: /\.html$/,
                loader: 'string-replace-loader',
                options: {
                    multiple: [
                        {search: 'src="/scripts.js"', replace: `src="${baseHref}scripts.js"`},
                        {search: /<a([^>]+)href="\/(.*?)"/gm, replace: `<a$1href="${baseHref}$2"`},
                        {search: /<link([^>]+)href="\/(.*?.css)"/gm, replace: `<link$1href="${baseHref}$2"`},
                    ]
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
