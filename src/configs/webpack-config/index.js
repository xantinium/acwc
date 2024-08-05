import path from 'node:path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { PROCESS_DIR } from '../../utils.js';
import { getWebpackLoaders } from './loaders.js';
import { getWebpackPlugins } from './plugins.js';
import { getWebpackDevServerConfig } from './dev-server.js';

function getWebpackConfig(isDev) {
    return {
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
            rules: getWebpackLoaders(isDev),
        },
        plugins: getWebpackPlugins(isDev),
        stats: {
            assets: false,
            modules: false,
            entrypoints: false,
            version: false,
        },
        infrastructureLogging: {
            level: 'warn',
        },
    };
}

export function createWebpackDevServer(isDev) {
    const devServerConfig = getWebpackDevServerConfig();
    const compiler = webpack(getWebpackConfig(isDev));

    return new WebpackDevServer(devServerConfig, compiler);
}
