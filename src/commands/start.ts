import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { getWebpackConfig } from '../configs/webpack-config';
import { getWebpackDevServerConfig } from '../configs/webpack-config/dev-server';

export function command_start() {
    const devServerConfig = getWebpackDevServerConfig();
    const compiler = webpack(getWebpackConfig(true));

    const wds = new WebpackDevServer(devServerConfig, compiler);

    wds.start();
}
