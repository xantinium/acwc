import ip from 'ip';
import path from 'node:path';
import readline from 'node:readline';
import { CURRENT_DIR } from '../../utils';
export function getWebpackDevServerConfig() {
    var target = "http://".concat(ip.address());
    return {
        port: 3000,
        static: path.join(CURRENT_DIR, '..', 'public'),
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
            readline.emitKeypressEvents(process.stdin);
            process.stdin.addListener('keypress', function (data) {
                if (data === 'q') {
                    process.exit(0);
                }
            });
            process.stdin.setRawMode(true);
        },
    };
}
