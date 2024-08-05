import ip from 'ip';
import path from 'node:path';
import readline from 'node:readline';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CURRENT_DIR, PROCESS_DIR } from '../utils.js';

function getWebpackLoaders() {
    const loaders = [
        {
            test: /\.[jt]sx?$/i,
            loader: 'swc-loader',
            exclude: /node_modules/,
        },
    ];

    return loaders;
}

export function getWebpackPlugins() {
    const plugins = [
        new MiniCssExtractPlugin({
            filename: 'wc.css',
            // см. https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250#issuecomment-447346852
            // и связанные с этим комментарием issue. Мы используем css модули - нам не важен порядок css.
            ignoreOrder: true,
        }),
        // Запрещаем ленгам создавать отдельный чанк
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ];

    return plugins;
}

function getWebpackDevServerConfig() {
    const target = `http://${ip.address()}`;

    return {
        port: 3000,
        static: path.join(CURRENT_DIR, 'public'),
        proxy: {
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

export function command_start() {
    const wds = new WebpackDevServer(getWebpackDevServerConfig(), webpack({
        target: 'web',
        mode: 'development',
        entry: path.join(PROCESS_DIR, 'index.ts'),
        output: {
            clean: true,
            path: path.join(PROCESS_DIR, 'dist'),
            filename: 'wc.js',
        },
        watchOptions: {
            ignored: /node_modules/,
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            fallback: {
                fs: false,
            },
        },
        devtool: 'eval-source-map',
        module: {
            rules: getWebpackLoaders(),
        },
        plugins: getWebpackPlugins(),
    }));

    wds.startCallback((err) => {
        console.log(`Starting...`, err);
    });
}
