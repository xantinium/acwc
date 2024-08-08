import ip from 'ip';
import path from 'node:path';
import readline from 'node:readline';
import { Configuration } from 'webpack-dev-server';

export function getWebpackDevServerConfig(): Configuration {
    const target = `http://${ip.address()}`;

    return {
        port: 3000,
        static: path.join('/home/vladislav/Desktop/wc-test/node_modules/altcraft-web-components/public'),
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
            readline.emitKeypressEvents(process.stdin);

            process.stdin.addListener('keypress', (data) => {
                if (data === 'q') {
                    process.exit(0);
                }
            });

            process.stdin.setRawMode(true);
        },

    };
}
