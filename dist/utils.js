var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import os from 'node:os';
import fs from 'node:fs/promises';
import path from 'node:path';
export var PROCESS_DIR = process.cwd();
export var CURRENT_DIR = import.meta.dirname;
var DIST_DIR = path.join(CURRENT_DIR, '..', 'dist');
function toUpperCaseFirstChar(str) {
    return "".concat(str.slice(0, 1).toUpperCase()).concat(str.slice(1));
}
export function convertFromKebabCase(text, style) {
    switch (style) {
        case 'pascal-case':
            return text.split('-').map(toUpperCaseFirstChar).join('');
        case 'spaced-pascal-case':
            return text.split('-').map(toUpperCaseFirstChar).join(' ');
    }
}
export var KNOWN_COMMANDS;
(function (KNOWN_COMMANDS) {
    KNOWN_COMMANDS["START"] = "start";
    KNOWN_COMMANDS["TEST"] = "test";
    KNOWN_COMMANDS["BUILD"] = "build";
})(KNOWN_COMMANDS || (KNOWN_COMMANDS = {}));
export function parseCommand(args) {
    var command = args[2];
    // TODO
    // @ts-ignore
    if (Object.values(KNOWN_COMMANDS).includes(command)) {
        return command;
    }
    return null;
}
var KNOWN_FILES = {
    INDEX_HTML: {
        in: '/public/index.html',
        out: '/public/index.html',
    },
    ABSTRACT_WEB_COMPONENT: {
        in: '/public/abstract-wc.js',
        out: '/public/abstract-wc.js',
    },
};
export function getFileContent(filepath) {
    return fs.readFile(filepath, { encoding: 'utf-8' });
}
export function setFileContent(filepath, content) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs.mkdir(path.dirname(filepath), { recursive: true })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    // TODO
                    if (typeof err_1 === 'object' && 'code' in err_1 && err_1.code !== 'EEXIST') {
                        throw err_1;
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, fs.writeFile(filepath, content + os.EOL, { encoding: 'utf-8' })];
            }
        });
    });
}
function fillAllParams(source, params) {
    var result = source;
    Object.entries(params).forEach(function (entry) {
        var key = entry[0], value = entry[1];
        result = result.replace(new RegExp("__".concat(key.toUpperCase(), "__"), 'g'), value);
    });
    return result;
}
export function generateDist(params) {
    return __awaiter(this, void 0, void 0, function () {
        var err_2, promises;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs.mkdir(DIST_DIR)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    // TODO
                    if (typeof err_2 === 'object' && 'code' in err_2 && err_2.code !== 'EEXIST') {
                        throw err_2;
                    }
                    return [3 /*break*/, 3];
                case 3:
                    promises = Object.values(KNOWN_FILES).map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                        var content, contentWithParams;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, getFileContent(path.join(CURRENT_DIR, '..', file.in))];
                                case 1:
                                    content = _a.sent();
                                    contentWithParams = fillAllParams(content, params);
                                    return [2 /*return*/, setFileContent(path.join(DIST_DIR, file.out), contentWithParams)];
                            }
                        });
                    }); });
                    return [2 /*return*/, Promise.all(promises)];
            }
        });
    });
}
/** Очистка сбилженых файлов */
export function cleanUp() {
    return fs.rm(DIST_DIR, { force: true, recursive: true });
}
