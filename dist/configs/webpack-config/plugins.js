"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpackPlugins = void 0;
var ip_1 = __importDefault(require("ip"));
var webpack_1 = __importDefault(require("webpack"));
var child_process_1 = require("child_process");
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var logger_1 = require("../../logger");
var IP_V4 = ip_1.default.address();
var DEFAULT_PORT = 3000;
function getPercentageHanlder() {
    var oldPercentage = -1;
    return function (v) {
        var percentage = Math.floor(v * 100);
        if (percentage > oldPercentage) {
            oldPercentage = percentage;
            logger_1.Logger.clear();
            logger_1.Logger.printLogo();
            logger_1.Logger.log('Project is running at: ', { withNewline: false });
            logger_1.Logger.log("http://".concat(IP_V4, ":").concat(DEFAULT_PORT, "\n"), { color: 'cyan' });
            logger_1.Logger.log('Press ', { withNewline: false });
            logger_1.Logger.log('q', { withNewline: false, color: 'green' });
            logger_1.Logger.log(' to exit\n');
            logger_1.Logger.log("Building an app...".concat(percentage, "%"));
        }
        if (oldPercentage === 100) {
            oldPercentage = -1;
        }
    };
}
function getWebpackPlugins(isDev) {
    var plugins = [
        new mini_css_extract_plugin_1.default({
            filename: 'web-components.css',
            ignoreOrder: true,
        }),
        new webpack_1.default.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ];
    if (isDev) {
        plugins.push(new webpack_1.default.ProgressPlugin({}));
    }
    else {
        var commitHash = (0, child_process_1.execSync)('git rev-parse --short HEAD').toString().trim();
        plugins.push(new webpack_1.default.BannerPlugin("Commit hash: ".concat(commitHash)));
    }
    return plugins;
}
exports.getWebpackPlugins = getWebpackPlugins;
