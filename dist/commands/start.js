"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command_start = void 0;
var webpack_config_1 = require("../configs/webpack-config");
function command_start() {
    var wds = (0, webpack_config_1.createWebpackDevServer)(true);
    wds.start();
}
exports.command_start = command_start;
