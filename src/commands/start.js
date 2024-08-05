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


export function command_start() {
    const wds = new WebpackDevServer({}, webpack({
        target: 'web',
        mode: 'development',
        entry: path.join(PROCESS_DIR, 'index.ts'),
        watchOptions: {
            ignored: /node_modules/,
        },
        devtool: 'eval-source-map',
        module: {
            rules: getWebpackLoaders(),
        },
    }));

    wds.startCallback((err) => {
        console.log(`Starting...`, err);
    });
}
