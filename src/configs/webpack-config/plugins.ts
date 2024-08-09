import ip from 'ip';
import webpack, { WebpackPluginInstance } from 'webpack';
import { execSync } from 'child_process';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Logger } from '../../logger';

const IP_V4 = ip.address();
const DEFAULT_PORT = 3000;

function getPercentageHanlder() {
    let oldPercentage = -1;

    return (v: number) => {
        const percentage = Math.floor(v * 100);

        if (percentage > oldPercentage) {
            oldPercentage = percentage;

            Logger.clear();
            Logger.printLogo();
            Logger.log('Project is running at: ', { withNewline: false });
            Logger.log(`http://${IP_V4}:${DEFAULT_PORT}\n`, { color: 'cyan' });
            Logger.log('Press ', { withNewline: false });
            Logger.log('q', { withNewline: false, color: 'green' });
            Logger.log(' to exit\n');
            Logger.log(`Building an app...${percentage}%`);
        }

        if (oldPercentage === 100) {
            oldPercentage = -1;
        }
    };
}

/**
 * @param {boolean} isDev
 */
export function getWebpackPlugins(isDev: boolean) {
    const plugins: WebpackPluginInstance[] = [
        new MiniCssExtractPlugin({
            filename: 'web-components.css',
            // см. https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250#issuecomment-447346852
            // и связанные с этим комментарием issue. Мы используем css модули - нам не важен порядок css.
            ignoreOrder: true,
        }),
        // Запрещаем ленгам создавать отдельный чанк
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        // new webpack.ProvidePlugin({
        //     React: 'react',
        // }),
        // new webpack.IgnorePlugin({
        //     resourceRegExp: /\.md$/i,
        // }),
    ];

    if (isDev) {
        plugins.push(
            new webpack.ProgressPlugin({
                // handler: getPercentageHanlder(),
            }),
        );
    } else {
        const commitHash = execSync('git rev-parse --short HEAD').toString().trim();

        plugins.push(
            new webpack.BannerPlugin(`Commit hash: ${commitHash}`),
        );
    }


    return plugins;
}
