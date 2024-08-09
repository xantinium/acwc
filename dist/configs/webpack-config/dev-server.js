"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpackDevServerConfig = void 0;
var ip_1 = __importDefault(require("ip"));
var path_1 = __importDefault(require("path"));
function getWebpackDevServerConfig() {
    var target = "http://".concat(ip_1.default.address());
    return {
        port: 3000,
        static: path_1.default.join('/home/vladislav/Desktop/wc-test/node_modules/altcraft-web-components/public'),
        client: {
            overlay: {
                warnings: false,
            },
        },
    };
}
exports.getWebpackDevServerConfig = getWebpackDevServerConfig;
