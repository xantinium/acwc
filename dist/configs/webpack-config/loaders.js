"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpackLoaders = void 0;
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
function getWebpackLoaders(isDev) {
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: false,
            modules: {
                auto: true,
                localIdentName: isDev ? '[folder]__[local]--[hash:base64:4]' : '[hash:base64]',
            },
        },
    };
    const loaders = [
        {
            test: /\.[jt]sx?$/i,
            include(value) {
                // Мы должны прогнать файлы из фронт репы через сборщик, т.к. там лежат ts-файлы
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
                            // Добавляем путь до фронт репы, нужно для работы абсолютных путей в scss
                            // Пример: @import 'src/styles/variabled/colors'
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
            // Не хотим инлайнить шрифты и увеличивать вес стилей
            exclude: [/node_modules\/altkraft-frontend\/src\/assets\/fonts/],
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
                // В проде нам не нужны шрифты, т.к. они уже есть в легаси
                emit: isDev,
            },
        },
    ];
    return loaders;
}
exports.getWebpackLoaders = getWebpackLoaders;
