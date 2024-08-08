#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acwc = void 0;
const start_1 = require("./commands/start");
const package_json_1 = require("./configs/package-json");
const utils_1 = require("./utils");
async function acwc() {
    const command = (0, utils_1.parseCommand)(process.argv);
    switch (command) {
        case utils_1.KNOWN_COMMANDS.START:
            (0, start_1.command_start)();
            return;
        case utils_1.KNOWN_COMMANDS.TEST:
            console.log('test');
            return;
        case utils_1.KNOWN_COMMANDS.BUILD:
            console.log('build');
            return;
    }
    (0, utils_1.cleanUp)();
    const packageJSON = await (0, package_json_1.initPackageJSON)();
    await (0, utils_1.generateDist)({
        name: (0, utils_1.convertFromKebabCase)(packageJSON.name, 'pascal-case'),
        title: (0, utils_1.convertFromKebabCase)(packageJSON.name, 'spaced-pascal-case'),
    });
}
exports.acwc = acwc;
