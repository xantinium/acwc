import { webpack } from 'webpack';
import { getWebpackConfig } from '../configs/webpack-config';

export function command_build() {
    const compiler = webpack(getWebpackConfig(false));

    compiler.run((err, stats) => {
        console.log(err, stats);
    });
}
