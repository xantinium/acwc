import ip from 'ip';
import path from 'node:path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { PROCESS_DIR } from '../utils.js';

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
        // new ProvidePlugin({
        //     React: 'react',
        // }),
        // new IgnorePlugin({
        //     resourceRegExp: /\.md$/i,
        // }),
        // new ForkTsCheckerWebpackPlugin({
        //     async: isDev,
        //     eslint: isDev ? {
        //         files: path.join(__dirname, '..', 'src'),
        //     } : undefined,
        //     issue: {
        //         // Оставляем только те ошибки, которые относятся к notify-template
        //         include(issue) {
        //             return !issue.file?.includes('node_modules');
        //         },
        //     },
        // }),
    ];

    // if (isDev) {
    //     plugins.push(
    //         new ProgressPlugin({
    //             handler: env.percentageHandler,
    //         }),
    //     );
    // } else {
    //     const commitHash = execSync('git rev-parse --short HEAD').toString().trim();

    //     plugins.push(
    //         new BannerPlugin(`Commit hash: ${commitHash}`),
    //     );
    // }

    return plugins;
}

function getWebpackDevServerConfig() {
    const target = `http://${ip.address()}`;

    return {
        port: 3000,
        historyApiFallback: true,
        proxy: [
            {
                target,
                logLevel: 'silent',
                // Для одностраничных приложений мы, как правило, хотим вернуться к /index.html.
                // Мы используем эвристическую схему: мы хотим проксировать все запросы, не для статики и
                // так как все запросы на статику будут использовать `GET` метод,
                // мы можем проксировать все не `GET` запросы.
                // Для `GET` запросов, если запрос `accept`s text/html, мы выбираем /index.html.
                // Современные браузеры включают текст/html в заголовок `accept` при навигации.
                // Однако вызовы API типа `fetch()` обычно не принимают текст/html.
                context(_, req) {
                    return (
                        req.method !== 'GET' || (
                            (req.headers.accept !== undefined
                            && req.headers.accept.indexOf('text/html') === -1)
                        )
                    );
                },
                onProxyReq(req) {
                    // Браузеры могут посылать заголовки Origin даже с однородным происхождением.
                    // Чтобы предотвратить проблемы с CORS, мы должны изменить
                    // происхождение, чтобы оно соответствовало целевому URL.
                    if (req.getHeader('origin')) {
                        req.setHeader('origin', target);
                    }
                },
                secure: false,
                changeOrigin: true,
                ws: true,
                xfwd: true,
            },
        ],
        client: {
            logging: 'error',
            overlay: {
                runtimeErrors(error) {
                    /**
                     * Ошибка обнаружена в dev режиме в отчетах (может быть еще где-то).
                     * По-хорошему нужно разобраться, явно есть проблема в коде
                     * Оставляю ссылку на stackoverflow
                     */
                    /* eslint-disable-next-line */
                    // https://stackoverflow.com/questions/76187282/react-resizeobserver-loop-completed-with-undelivered-notifications
                    if (error.message === 'ResizeObserver loop completed with undelivered notifications.') {
                        return false;
                    }

                    return true;
                },
                errors: true,
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
        // stats: {
        //     assets: false,
        //     modules: false,
        //     entrypoints: false,
        //     version: false,
        // },
        module: {
            rules: getWebpackLoaders(),
        },
        plugins: getWebpackPlugins(),
    }));

    wds.startCallback((err) => {
        console.log(`Starting...`, err);
    });
}
