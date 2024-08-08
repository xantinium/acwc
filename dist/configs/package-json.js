"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPackageJSON = void 0;
const node_path_1 = __importDefault(require("node:path"));
const utils_1 = require("../utils");
const PROJECT_NAME_REGEXP = /^[a-z\d\-]+$/;
const packageJSONPath = node_path_1.default.join(utils_1.PROCESS_DIR, 'package.json');
async function getPackageJSON() {
    let maybePackageJSON;
    try {
        maybePackageJSON = await (0, utils_1.getFileContent)(packageJSONPath);
    }
    catch (_) {
        throw new Error('No "package.json" found');
    }
    let packageJSON;
    try {
        packageJSON = JSON.parse(maybePackageJSON);
    }
    catch (_) {
        throw new Error('The "package.json" is not a valid JSON');
    }
    return packageJSON;
}
// TODO
function validatePackageJSON(packageJSON) {
    const name = packageJSON.name;
    if (!name) {
        throw new Error('The "package.json" is invalid: no "name" field');
    }
    if (!PROJECT_NAME_REGEXP.test(name)) {
        throw new Error(`The "package.json" is invalid: "name" field should match the pattern: ${PROJECT_NAME_REGEXP}`);
    }
}
// TODO
async function initPackageJSON() {
    const packageJSON = await getPackageJSON();
    validatePackageJSON(packageJSON);
    packageJSON.scripts = {
        ...(packageJSON.scripts ?? {}),
        start: 'acwc start',
        test: 'acwc test',
        build: 'acwc build',
    };
    await (0, utils_1.setFileContent)(packageJSONPath, JSON.stringify(packageJSON, null, 2));
    return packageJSON;
}
exports.initPackageJSON = initPackageJSON;
