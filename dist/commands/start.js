import { createWebpackDevServer } from '../configs/webpack-config';
export function command_start() {
    var wds = createWebpackDevServer(true);
    wds.start();
}
