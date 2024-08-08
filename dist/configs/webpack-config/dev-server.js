"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpackDevServerConfig = void 0;
const ip_1 = __importDefault(require("ip"));
const node_path_1 = __importDefault(require("node:path"));
const node_readline_1 = __importDefault(require("node:readline"));
const utils_1 = require("../../utils");
function getWebpackDevServerConfig() {
    const target = `http://${ip_1.default.address()}`;
    return {
        port: 3000,
        static: node_path_1.default.join(utils_1.CURRENT_DIR, '..', 'public'),
        proxy: [
            {
                target,
                logLevel: 'silent',
                context(pathname) {
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
        onListening() {
            node_readline_1.default.emitKeypressEvents(process.stdin);
            process.stdin.addListener('keypress', (data) => {
                if (data === 'q') {
                    process.exit(0);
                }
            });
            process.stdin.setRawMode(true);
        },
    };
}
exports.getWebpackDevServerConfig = getWebpackDevServerConfig;