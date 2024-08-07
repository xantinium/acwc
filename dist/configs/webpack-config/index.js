"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpackConfig = void 0;
var path_1 = __importDefault(require("path"));
var utils_1 = require("../../utils");
var loaders_1 = require("./loaders");
var plugins_1 = require("./plugins");
function getWebpackConfig(isDev) {
    return {
        target: 'web',
        mode: 'development',
        entry: path_1.default.join(utils_1.PROCESS_DIR, 'index.ts'),
        output: {
            clean: true,
            path: path_1.default.join(utils_1.PROCESS_DIR, 'dist'),
            filename: 'web-component.js',
        },
        watchOptions: {
            ignored: /node_modules/,
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            fallback: {
                fs: false,
            },
        },
        devtool: 'eval-source-map',
        module: {
            rules: (0, loaders_1.getWebpackLoaders)(isDev),
        },
        plugins: (0, plugins_1.getWebpackPlugins)(isDev),
    };
}
exports.getWebpackConfig = getWebpackConfig;
