"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpackPlugins = void 0;
const ip_1 = __importDefault(require("ip"));
const webpack_1 = __importDefault(require("webpack"));
const node_child_process_1 = require("node:child_process");
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const logger_1 = require("../../logger");
const IP_V4 = ip_1.default.address();
const DEFAULT_PORT = 3000;
function getPercentageHanlder() {
    let oldPercentage = -1;
    return (v) => {
        const percentage = Math.floor(v * 100);
        if (percentage > oldPercentage) {
            oldPercentage = percentage;
            logger_1.Logger.clear();
            logger_1.Logger.printLogo();
            logger_1.Logger.log('Project is running at: ', { withNewline: false });
            logger_1.Logger.log(`http://${IP_V4}:${DEFAULT_PORT}\n`, { color: 'cyan' });
            logger_1.Logger.log('Press ', { withNewline: false });
            logger_1.Logger.log('q', { withNewline: false, color: 'green' });
            logger_1.Logger.log(' to exit\n');
            logger_1.Logger.log(`Building an app...${percentage}%`);
        }
        if (oldPercentage === 100) {
            oldPercentage = -1;
        }
    };
}
/**
 * @param {boolean} isDev
 */
function getWebpackPlugins(isDev) {
    const plugins = [
        new mini_css_extract_plugin_1.default({
            filename: 'wc.css',
            // см. https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250#issuecomment-447346852
            // и связанные с этим комментарием issue. Мы используем css модули - нам не важен порядок css.
            ignoreOrder: true,
        }),
        // Запрещаем ленгам создавать отдельный чанк
        new webpack_1.default.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new webpack_1.default.ProvidePlugin({
            React: 'react',
        }),
        new webpack_1.default.IgnorePlugin({
            resourceRegExp: /\.md$/i,
        }),
    ];
    if (isDev) {
        plugins.push(new webpack_1.default.ProgressPlugin({
        // handler: getPercentageHanlder(),
        }));
    }
    else {
        const commitHash = (0, node_child_process_1.execSync)('git rev-parse --short HEAD').toString().trim();
        plugins.push(new webpack_1.default.BannerPlugin(`Commit hash: ${commitHash}`));
    }
    return plugins;
}
exports.getWebpackPlugins = getWebpackPlugins;
