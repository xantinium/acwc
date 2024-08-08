#!/usr/bin/env node
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
System.register("utils", ["node:os", "node:fs/promises", "node:path"], function (exports_1, context_1) {
    "use strict";
    var node_os_1, promises_1, node_path_1, PROCESS_DIR, CURRENT_DIR, DIST_DIR, KNOWN_COMMANDS, KNOWN_FILES;
    var __moduleName = context_1 && context_1.id;
    function toUpperCaseFirstChar(str) {
        return "".concat(str.slice(0, 1).toUpperCase()).concat(str.slice(1));
    }
    function convertFromKebabCase(text, style) {
        switch (style) {
            case 'pascal-case':
                return text.split('-').map(toUpperCaseFirstChar).join('');
            case 'spaced-pascal-case':
                return text.split('-').map(toUpperCaseFirstChar).join(' ');
        }
    }
    exports_1("convertFromKebabCase", convertFromKebabCase);
    function parseCommand(args) {
        var command = args[2];
        // TODO
        // @ts-ignore
        if (Object.values(KNOWN_COMMANDS).includes(command)) {
            return command;
        }
        return null;
    }
    exports_1("parseCommand", parseCommand);
    function getFileContent(filepath) {
        return promises_1.default.readFile(filepath, { encoding: 'utf-8' });
    }
    exports_1("getFileContent", getFileContent);
    function setFileContent(filepath, content) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, promises_1.default.mkdir(node_path_1.default.dirname(filepath), { recursive: true })];
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
                    case 3: return [2 /*return*/, promises_1.default.writeFile(filepath, content + node_os_1.default.EOL, { encoding: 'utf-8' })];
                }
            });
        });
    }
    exports_1("setFileContent", setFileContent);
    function fillAllParams(source, params) {
        var result = source;
        Object.entries(params).forEach(function (entry) {
            var key = entry[0], value = entry[1];
            result = result.replace(new RegExp("__".concat(key.toUpperCase(), "__"), 'g'), value);
        });
        return result;
    }
    function generateDist(params) {
        return __awaiter(this, void 0, void 0, function () {
            var err_2, promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, promises_1.default.mkdir(DIST_DIR)];
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
                                    case 0: return [4 /*yield*/, getFileContent(node_path_1.default.join(CURRENT_DIR, '..', file.in))];
                                    case 1:
                                        content = _a.sent();
                                        contentWithParams = fillAllParams(content, params);
                                        return [2 /*return*/, setFileContent(node_path_1.default.join(DIST_DIR, file.out), contentWithParams)];
                                }
                            });
                        }); });
                        return [2 /*return*/, Promise.all(promises)];
                }
            });
        });
    }
    exports_1("generateDist", generateDist);
    /** Очистка сбилженых файлов */
    function cleanUp() {
        return promises_1.default.rm(DIST_DIR, { force: true, recursive: true });
    }
    exports_1("cleanUp", cleanUp);
    return {
        setters: [
            function (node_os_1_1) {
                node_os_1 = node_os_1_1;
            },
            function (promises_1_1) {
                promises_1 = promises_1_1;
            },
            function (node_path_1_1) {
                node_path_1 = node_path_1_1;
            }
        ],
        execute: function () {
            exports_1("PROCESS_DIR", PROCESS_DIR = process.cwd());
            exports_1("CURRENT_DIR", CURRENT_DIR = context_1.meta.dirname);
            DIST_DIR = node_path_1.default.join(CURRENT_DIR, '..', 'dist');
            (function (KNOWN_COMMANDS) {
                KNOWN_COMMANDS["START"] = "start";
                KNOWN_COMMANDS["TEST"] = "test";
                KNOWN_COMMANDS["BUILD"] = "build";
            })(KNOWN_COMMANDS || (exports_1("KNOWN_COMMANDS", KNOWN_COMMANDS = {})));
            KNOWN_FILES = {
                INDEX_HTML: {
                    in: '/public/index.html',
                    out: '/public/index.html',
                },
                ABSTRACT_WEB_COMPONENT: {
                    in: '/public/abstract-wc.js',
                    out: '/public/abstract-wc.js',
                },
            };
        }
    };
});
System.register("configs/webpack-config/loaders", ["mini-css-extract-plugin"], function (exports_2, context_2) {
    "use strict";
    var mini_css_extract_plugin_1;
    var __moduleName = context_2 && context_2.id;
    function getWebpackLoaders(isDev) {
        var cssLoader = {
            loader: 'css-loader',
            options: {
                sourceMap: false,
                modules: {
                    auto: true,
                    localIdentName: isDev ? '[folder]__[local]--[hash:base64:4]' : '[hash:base64]',
                },
            },
        };
        var loaders = [
            {
                test: /\.[jt]sx?$/i,
                include: function (value) {
                    // Мы должны прогнать файлы из фронт репы через сборщик, т.к. там лежат ts-файлы
                    if (value.includes('node_modules')) {
                        return value.includes('altkraft-frontend');
                    }
                    return true;
                },
                loader: 'swc-loader',
            },
            {
                test: /\.css$/i,
                use: [
                    mini_css_extract_plugin_1.default.loader,
                    cssLoader,
                ],
                exclude: [],
            },
            {
                test: /\.scss$/i,
                use: [
                    mini_css_extract_plugin_1.default.loader,
                    cssLoader,
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                // Добавляем путь до фронт репы, нужно для работы абсолютных путей в scss
                                // Пример: @import 'src/styles/variabled/colors'
                                includePaths: ['node_modules/altkraft-frontend'],
                            },
                        },
                    },
                ],
                exclude: [],
            },
            {
                test: /\.less$/i,
                use: [
                    mini_css_extract_plugin_1.default.loader,
                    cssLoader,
                    'less-loader',
                ],
                exclude: [],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/inline',
                // Не хотим инлайнить шрифты и увеличивать вес стилей
                exclude: [/node_modules\/altkraft-frontend\/src\/assets\/fonts/],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    // В проде нам не нужны шрифты, т.к. они уже есть в легаси
                    emit: isDev,
                },
            },
        ];
        return loaders;
    }
    exports_2("getWebpackLoaders", getWebpackLoaders);
    return {
        setters: [
            function (mini_css_extract_plugin_1_1) {
                mini_css_extract_plugin_1 = mini_css_extract_plugin_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("logger", [], function (exports_3, context_3) {
    "use strict";
    var Logger;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            exports_3("Logger", Logger = {
                /** Очистка консоли */
                clear: function () {
                    process.stdout.write('\x1Bc');
                },
                /**
                 * Вывод логотипа
                 * @param padding Размер отступа
                 */
                printLogo: function (padding) {
                    if (padding === void 0) { padding = 12; }
                    var logo = "\n          _ _    _____            __ _\n    /\\   | | |  / ____|          / _| |\n   /  \\  | | |_| |     _ __ __ _| |_| |_\n  / /\\ \\ | | __| |    | '__/ _` |  _| __|\n / ____ \\| | |_| |____| | | (_| | | | |_\n/_/    \\_\\_|\\__|\\_____|_|  \\__,_|_|  \\__|\n        ";
                    logo = logo.split('\n').map(function (line) { return "".concat(' '.repeat(padding)).concat(line); }).join('\n');
                    this.log(logo, { color: 'cyan' });
                    var title = 'Notify Template\n';
                    var titlePadding = padding + 20 - title.length * 0.5;
                    this.log("".concat(' '.repeat(titlePadding)).concat(title));
                },
                /**
                 * Стилизованный вывод в консоль
                 * @param text Текст
                 * @param options Параметры стилизации
                 */
                log: function (text, options) {
                    var fontModificators = [];
                    var RESET = '\x1b[0m';
                    var FONT_COLORS = {
                        black: '\x1b[30m',
                        red: '\x1b[31m',
                        green: '\x1b[32m',
                        yellow: '\x1b[33m',
                        blue: '\x1b[34m',
                        magenta: '\x1b[35m',
                        cyan: '\x1b[36m',
                        white: '\x1b[37m',
                    };
                    var BG_COLORS = {
                        black: '\x1b[40m',
                        red: '\x1b[41m',
                        green: '\x1b[42m',
                        yellow: '\x1b[43m',
                        blue: '\x1b[44m',
                        magenta: '\x1b[45m',
                        cyan: '\x1b[46m',
                        white: '\x1b[47m',
                    };
                    if (options) {
                        if (options.color && options.color in FONT_COLORS) {
                            fontModificators.push(FONT_COLORS[options.color]);
                        }
                        if (options.bgColor && options.bgColor in BG_COLORS) {
                            fontModificators.push(BG_COLORS[options.bgColor]);
                        }
                    }
                    if (fontModificators.length === 0) {
                        process.stdout.write(text);
                    }
                    else {
                        for (var i = 0; i < fontModificators.length; i++) {
                            process.stdout.write(fontModificators[i]);
                        }
                        process.stdout.write(text);
                        process.stdout.write(RESET);
                    }
                    if ((options === null || options === void 0 ? void 0 : options.withNewline) !== false) {
                        process.stdout.write('\n');
                    }
                },
                /**
                 * Логирование ошибки и завершение процесса сборки
                 * @param text Текст ошибки
                 */
                fatal: function (text) {
                    this.log(' ERROR ', { bgColor: 'red', withNewline: false });
                    this.log(" ".concat(text));
                    process.exit(1);
                },
            });
        }
    };
});
System.register("configs/webpack-config/plugins", ["ip", "webpack", "node:child_process", "mini-css-extract-plugin", "logger"], function (exports_4, context_4) {
    "use strict";
    var ip_1, webpack_1, node_child_process_1, mini_css_extract_plugin_2, logger_1, IP_V4, DEFAULT_PORT;
    var __moduleName = context_4 && context_4.id;
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
    /**
     * @param {boolean} isDev
     */
    function getWebpackPlugins(isDev) {
        var plugins = [
            new mini_css_extract_plugin_2.default({
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
            var commitHash = node_child_process_1.execSync('git rev-parse --short HEAD').toString().trim();
            plugins.push(new webpack_1.default.BannerPlugin("Commit hash: ".concat(commitHash)));
        }
        return plugins;
    }
    exports_4("getWebpackPlugins", getWebpackPlugins);
    return {
        setters: [
            function (ip_1_1) {
                ip_1 = ip_1_1;
            },
            function (webpack_1_1) {
                webpack_1 = webpack_1_1;
            },
            function (node_child_process_1_1) {
                node_child_process_1 = node_child_process_1_1;
            },
            function (mini_css_extract_plugin_2_1) {
                mini_css_extract_plugin_2 = mini_css_extract_plugin_2_1;
            },
            function (logger_1_1) {
                logger_1 = logger_1_1;
            }
        ],
        execute: function () {
            IP_V4 = ip_1.default.address();
            DEFAULT_PORT = 3000;
        }
    };
});
System.register("configs/webpack-config/dev-server", ["ip", "node:path", "node:readline", "utils"], function (exports_5, context_5) {
    "use strict";
    var ip_2, node_path_2, node_readline_1, utils_1;
    var __moduleName = context_5 && context_5.id;
    function getWebpackDevServerConfig() {
        var target = "http://".concat(ip_2.default.address());
        return {
            port: 3000,
            static: node_path_2.default.join(utils_1.CURRENT_DIR, '..', 'public'),
            proxy: [
                {
                    target: target,
                    logLevel: 'silent',
                    context: function (pathname) {
                        if (pathname.includes('/ajax')) {
                            return true;
                        }
                        // Нужно для работы картинок в галерее
                        if (/.(png|jpg|jpeg|gif)$/.test(pathname)) {
                            return true;
                        }
                        return false;
                    },
                    secure: false,
                    changeOrigin: true,
                    ws: true,
                    xfwd: true,
                },
            ],
            client: {
                overlay: {
                    warnings: false,
                },
            },
            onListening: function () {
                node_readline_1.default.emitKeypressEvents(process.stdin);
                process.stdin.addListener('keypress', function (data) {
                    if (data === 'q') {
                        process.exit(0);
                    }
                });
                process.stdin.setRawMode(true);
            },
        };
    }
    exports_5("getWebpackDevServerConfig", getWebpackDevServerConfig);
    return {
        setters: [
            function (ip_2_1) {
                ip_2 = ip_2_1;
            },
            function (node_path_2_1) {
                node_path_2 = node_path_2_1;
            },
            function (node_readline_1_1) {
                node_readline_1 = node_readline_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("configs/webpack-config/index", ["node:path", "webpack", "webpack-dev-server", "utils", "configs/webpack-config/loaders", "configs/webpack-config/plugins", "configs/webpack-config/dev-server"], function (exports_6, context_6) {
    "use strict";
    var node_path_3, webpack_2, webpack_dev_server_1, utils_2, loaders_1, plugins_1, dev_server_1;
    var __moduleName = context_6 && context_6.id;
    function getWebpackConfig(isDev) {
        return {
            target: 'web',
            mode: 'development',
            entry: node_path_3.default.join(utils_2.PROCESS_DIR, 'index.ts'),
            output: {
                clean: true,
                path: node_path_3.default.join(utils_2.PROCESS_DIR, 'dist'),
                filename: 'wc.js',
            },
            watchOptions: {
                ignored: /node_modules/,
            },
            resolve: {
                extensions: ['.ts', '.tsx'],
                fallback: {
                    fs: false,
                },
            },
            devtool: 'eval-source-map',
            module: {
                rules: loaders_1.getWebpackLoaders(isDev),
            },
            plugins: plugins_1.getWebpackPlugins(isDev),
            // stats: {
            //     assets: false,
            //     modules: false,
            //     entrypoints: false,
            //     version: false,
            // },
            // infrastructureLogging: {
            //     level: 'warn',
            // },
        };
    }
    function createWebpackDevServer(isDev) {
        var devServerConfig = dev_server_1.getWebpackDevServerConfig();
        var compiler = webpack_2.default(getWebpackConfig(isDev));
        return new webpack_dev_server_1.default(devServerConfig, compiler);
    }
    exports_6("createWebpackDevServer", createWebpackDevServer);
    return {
        setters: [
            function (node_path_3_1) {
                node_path_3 = node_path_3_1;
            },
            function (webpack_2_1) {
                webpack_2 = webpack_2_1;
            },
            function (webpack_dev_server_1_1) {
                webpack_dev_server_1 = webpack_dev_server_1_1;
            },
            function (utils_2_1) {
                utils_2 = utils_2_1;
            },
            function (loaders_1_1) {
                loaders_1 = loaders_1_1;
            },
            function (plugins_1_1) {
                plugins_1 = plugins_1_1;
            },
            function (dev_server_1_1) {
                dev_server_1 = dev_server_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("commands/start", ["configs/webpack-config/index"], function (exports_7, context_7) {
    "use strict";
    var webpack_config_1;
    var __moduleName = context_7 && context_7.id;
    function command_start() {
        var wds = webpack_config_1.createWebpackDevServer(true);
        wds.start();
    }
    exports_7("command_start", command_start);
    return {
        setters: [
            function (webpack_config_1_1) {
                webpack_config_1 = webpack_config_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("configs/package-json", ["node:path", "utils"], function (exports_8, context_8) {
    "use strict";
    var node_path_4, utils_3, PROJECT_NAME_REGEXP, packageJSONPath;
    var __moduleName = context_8 && context_8.id;
    function getPackageJSON() {
        return __awaiter(this, void 0, void 0, function () {
            var maybePackageJSON, _1, packageJSON;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, utils_3.getFileContent(packageJSONPath)];
                    case 1:
                        maybePackageJSON = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _1 = _a.sent();
                        throw new Error('No "package.json" found');
                    case 3:
                        try {
                            packageJSON = JSON.parse(maybePackageJSON);
                        }
                        catch (_) {
                            throw new Error('The "package.json" is not a valid JSON');
                        }
                        return [2 /*return*/, packageJSON];
                }
            });
        });
    }
    // TODO
    function validatePackageJSON(packageJSON) {
        var name = packageJSON.name;
        if (!name) {
            throw new Error('The "package.json" is invalid: no "name" field');
        }
        if (!PROJECT_NAME_REGEXP.test(name)) {
            throw new Error("The \"package.json\" is invalid: \"name\" field should match the pattern: ".concat(PROJECT_NAME_REGEXP));
        }
    }
    // TODO
    function initPackageJSON() {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var packageJSON;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getPackageJSON()];
                    case 1:
                        packageJSON = _b.sent();
                        validatePackageJSON(packageJSON);
                        packageJSON.scripts = __assign(__assign({}, ((_a = packageJSON.scripts) !== null && _a !== void 0 ? _a : {})), { start: 'acwc start', test: 'acwc test', build: 'acwc build' });
                        return [4 /*yield*/, utils_3.setFileContent(packageJSONPath, JSON.stringify(packageJSON, null, 2))];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, packageJSON];
                }
            });
        });
    }
    exports_8("initPackageJSON", initPackageJSON);
    return {
        setters: [
            function (node_path_4_1) {
                node_path_4 = node_path_4_1;
            },
            function (utils_3_1) {
                utils_3 = utils_3_1;
            }
        ],
        execute: function () {
            PROJECT_NAME_REGEXP = /^[a-z\d\-]+$/;
            packageJSONPath = node_path_4.default.join(utils_3.PROCESS_DIR, 'package.json');
        }
    };
});
System.register("index", ["commands/start", "configs/package-json", "utils"], function (exports_9, context_9) {
    "use strict";
    var start_1, package_json_1, utils_4;
    var __moduleName = context_9 && context_9.id;
    function acwc() {
        return __awaiter(this, void 0, void 0, function () {
            var command, packageJSON;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = utils_4.parseCommand(process.argv);
                        switch (command) {
                            case utils_4.KNOWN_COMMANDS.START:
                                start_1.command_start();
                                return [2 /*return*/];
                            case utils_4.KNOWN_COMMANDS.TEST:
                                console.log('test');
                                return [2 /*return*/];
                            case utils_4.KNOWN_COMMANDS.BUILD:
                                console.log('build');
                                return [2 /*return*/];
                        }
                        utils_4.cleanUp();
                        return [4 /*yield*/, package_json_1.initPackageJSON()];
                    case 1:
                        packageJSON = _a.sent();
                        return [4 /*yield*/, utils_4.generateDist({
                                name: utils_4.convertFromKebabCase(packageJSON.name, 'pascal-case'),
                                title: utils_4.convertFromKebabCase(packageJSON.name, 'spaced-pascal-case'),
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    return {
        setters: [
            function (start_1_1) {
                start_1 = start_1_1;
            },
            function (package_json_1_1) {
                package_json_1 = package_json_1_1;
            },
            function (utils_4_1) {
                utils_4 = utils_4_1;
            }
        ],
        execute: function () {
            acwc();
        }
    };
});
