import path from 'node:path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { PROCESS_DIR } from '../../utils';
import { getWebpackLoaders } from './loaders';
import { getWebpackPlugins } from './plugins';
import { getWebpackDevServerConfig } from './dev-server';
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
            extensions: ['.ts', '.tsx'],
            fallback: {
                fs: false,
            },
        },
        devtool: 'eval-source-map',
        module: {
            rules: getWebpackLoaders(isDev),
        },
        plugins: getWebpackPlugins(isDev),
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
export function createWebpackDevServer(isDev) {
    var devServerConfig = getWebpackDevServerConfig();
    var compiler = webpack(getWebpackConfig(isDev));
    return new WebpackDevServer(devServerConfig, compiler);
}
