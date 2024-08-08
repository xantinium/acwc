"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanUp = exports.generateDist = exports.setFileContent = exports.getFileContent = exports.parseCommand = exports.KNOWN_COMMANDS = exports.convertFromKebabCase = exports.CURRENT_DIR = exports.PROCESS_DIR = void 0;
const node_os_1 = __importDefault(require("node:os"));
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
exports.PROCESS_DIR = process.cwd();
// export const CURRENT_DIR = import.meta.dirname;
exports.CURRENT_DIR = __dirname;
const DIST_DIR = node_path_1.default.join(exports.CURRENT_DIR, '..', 'dist');
function toUpperCaseFirstChar(str) {
    return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
}
function convertFromKebabCase(text, style) {
    switch (style) {
        case 'pascal-case':
            return text.split('-').map(toUpperCaseFirstChar).join('');
        case 'spaced-pascal-case':
            return text.split('-').map(toUpperCaseFirstChar).join(' ');
    }
}
exports.convertFromKebabCase = convertFromKebabCase;
var KNOWN_COMMANDS;
(function (KNOWN_COMMANDS) {
    KNOWN_COMMANDS["START"] = "start";
    KNOWN_COMMANDS["TEST"] = "test";
    KNOWN_COMMANDS["BUILD"] = "build";
})(KNOWN_COMMANDS || (exports.KNOWN_COMMANDS = KNOWN_COMMANDS = {}));
function parseCommand(args) {
    const command = args[2];
    // TODO
    // @ts-ignore
    if (Object.values(KNOWN_COMMANDS).includes(command)) {
        return command;
    }
    return null;
}
exports.parseCommand = parseCommand;
const KNOWN_FILES = {
    INDEX_HTML: {
        in: '/public/index.html',
        out: '/public/index.html',
    },
    ABSTRACT_WEB_COMPONENT: {
        in: '/public/abstract-wc.js',
        out: '/public/abstract-wc.js',
    },
};
function getFileContent(filepath) {
    return promises_1.default.readFile(filepath, { encoding: 'utf-8' });
}
exports.getFileContent = getFileContent;
async function setFileContent(filepath, content) {
    try {
        await promises_1.default.mkdir(node_path_1.default.dirname(filepath), { recursive: true });
    }
    catch (err) {
        // TODO
        if (typeof err === 'object' && 'code' in err && err.code !== 'EEXIST') {
            throw err;
        }
    }
    return promises_1.default.writeFile(filepath, content + node_os_1.default.EOL, { encoding: 'utf-8' });
}
exports.setFileContent = setFileContent;
function fillAllParams(source, params) {
    let result = source;
    Object.entries(params).forEach((entry) => {
        const [key, value] = entry;
        result = result.replace(new RegExp(`__${key.toUpperCase()}__`, 'g'), value);
    });
    return result;
}
async function generateDist(params) {
    try {
        await promises_1.default.mkdir(DIST_DIR);
    }
    catch (err) {
        // TODO
        if (typeof err === 'object' && 'code' in err && err.code !== 'EEXIST') {
            throw err;
        }
    }
    const promises = Object.values(KNOWN_FILES).map(async (file) => {
        const content = await getFileContent(node_path_1.default.join(exports.CURRENT_DIR, '..', file.in));
        const contentWithParams = fillAllParams(content, params);
        return setFileContent(node_path_1.default.join(DIST_DIR, file.out), contentWithParams);
    });
    return Promise.all(promises);
}
exports.generateDist = generateDist;
/** Очистка сбилженых файлов */
function cleanUp() {
    return promises_1.default.rm(DIST_DIR, { force: true, recursive: true });
}
exports.cleanUp = cleanUp;
