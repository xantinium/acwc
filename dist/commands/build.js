"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command_build = void 0;
var webpack_1 = require("webpack");
var webpack_config_1 = require("../configs/webpack-config");
function command_build() {
    var compiler = (0, webpack_1.webpack)((0, webpack_config_1.getWebpackConfig)(false));
    compiler.run(function (err, stats) {
        console.log(err, stats);
    });
}
exports.command_build = command_build;
