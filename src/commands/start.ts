import { createWebpackDevServer } from '../configs/webpack-config';

export function command_start() {
    const wds = createWebpackDevServer(true);

    wds.start();
}
