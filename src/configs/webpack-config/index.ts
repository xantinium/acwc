import path from 'path';
import { Configuration } from 'webpack';
import { PROCESS_DIR } from '../../utils';
import { getWebpackLoaders } from './loaders';
import { getWebpackPlugins } from './plugins';

export function getWebpackConfig(isDev: boolean): Configuration {
    return {
        target: 'web',
        mode: 'development',
        entry: path.join(PROCESS_DIR, 'index.ts'),
        output: {
            clean: true,
            path: path.join(PROCESS_DIR, 'dist'),
            filename: 'web-component.js',
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
