import { createWebpackDevServer } from '../configs/webpack-config/index.js';

export function command_start() {
    const wds = createWebpackDevServer();

    wds.start();
}
