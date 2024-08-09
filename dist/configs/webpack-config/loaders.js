"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpackLoaders = void 0;
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
function getWebpackLoaders(isDev) {
    var cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: false,
            modules: {
                auto: true,
                localIdentName: isDev ? '[folder]__[local]--[hash:base64:4]' : '[hash:base64]',
            },
        },
    };
    var loaders = [
        {
            test: /\.[jt]sx?$/i,
            include: function (value) {
                if (value.includes('node_modules')) {
                    return value.includes('altkraft-frontend');
                }
                return true;
            },
            loader: 'swc-loader',
        },
        {
            test: /\.css$/i,
            use: [
                mini_css_extract_plugin_1.default.loader,
                cssLoader,
            ],
            exclude: [],
        },
        {
            test: /\.scss$/i,
            use: [
                mini_css_extract_plugin_1.default.loader,
                cssLoader,
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            includePaths: ['node_modules/altkraft-frontend'],
                        },
                    },
                },
            ],
            exclude: [],
        },
        {
            test: /\.less$/i,
            use: [
                mini_css_extract_plugin_1.default.loader,
                cssLoader,
                'less-loader',
            ],
            exclude: [],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/inline',
            exclude: [/node_modules\/altkraft-frontend\/src\/assets\/fonts/],
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
                emit: isDev,
            },
        },
    ];
    return loaders;
}
exports.getWebpackLoaders = getWebpackLoaders;
