"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebpackDevServer = void 0;
const node_path_1 = __importDefault(require("node:path"));
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const utils_1 = require("../../utils");
const loaders_1 = require("./loaders");
const plugins_1 = require("./plugins");
const dev_server_1 = require("./dev-server");
function getWebpackConfig(isDev) {
    return {
        target: 'web',
        mode: 'development',
        entry: node_path_1.default.join(utils_1.PROCESS_DIR, 'index.ts'),
        output: {
            clean: true,
            path: node_path_1.default.join(utils_1.PROCESS_DIR, 'dist'),
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
        // stats: {
        //     assets: false,
        //     modules: false,
        //     entrypoints: false,
        //     version: false,
        // },
        // infrastructureLogging: {
        //     level: 'warn',
        // },
    };
}
function createWebpackDevServer(isDev) {
    const devServerConfig = (0, dev_server_1.getWebpackDevServerConfig)();
    const compiler = (0, webpack_1.default)(getWebpackConfig(isDev));
    return new webpack_dev_server_1.default(devServerConfig, compiler);
}
exports.createWebpackDevServer = createWebpackDevServer;
