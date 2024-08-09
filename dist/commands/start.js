"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command_start = void 0;
var webpack_1 = __importDefault(require("webpack"));
var webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
var webpack_config_1 = require("../configs/webpack-config");
var dev_server_1 = require("../configs/webpack-config/dev-server");
function command_start() {
    var devServerConfig = (0, dev_server_1.getWebpackDevServerConfig)();
    var compiler = (0, webpack_1.default)((0, webpack_config_1.getWebpackConfig)(true));
    var wds = new webpack_dev_server_1.default(devServerConfig, compiler);
    wds.start();
}
exports.command_start = command_start;
