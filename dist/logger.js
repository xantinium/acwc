"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
exports.Logger = {
    clear: function () {
        process.stdout.write('\x1Bc');
    },
    printLogo: function (padding) {
        if (padding === void 0) { padding = 12; }
        var logo = "\n          _ _    _____            __ _\n    /\\   | | |  / ____|          / _| |\n   /  \\  | | |_| |     _ __ __ _| |_| |_\n  / /\\ \\ | | __| |    | '__/ _` |  _| __|\n / ____ \\| | |_| |____| | | (_| | | | |_\n/_/    \\_\\_|\\__|\\_____|_|  \\__,_|_|  \\__|\n        ";
        logo = logo.split('\n').map(function (line) { return "".concat(' '.repeat(padding)).concat(line); }).join('\n');
        this.log(logo, { color: 'cyan' });
        var title = 'Notify Template\n';
        var titlePadding = padding + 20 - title.length * 0.5;
        this.log("".concat(' '.repeat(titlePadding)).concat(title));
    },
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
    fatal: function (text) {
        this.log(' ERROR ', { bgColor: 'red', withNewline: false });
        this.log(" ".concat(text));
        process.exit(1);
    },
};
