/* 公共配置 */

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const FriendlyErrorWebpackPlugin = require('friendly-errors-webpack-plugin');
const resolve = file => path.resolve(__dirname, file);

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProd ? 'production' : 'development',
    output: {
        path: resolve('dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            // 路径别名，@ 指向 src
            '@': resolve('./src')
        },
        // 可以省略的扩展名
        // 当省略扩展名的时候，按照从前往后的顺序依次解析
        extensions: ['.js', '.vue', '.json']
    },
    devtool: isProd ? 'source-map': 'cheap-module-source-map',
    module: {
        rules: [
            // 处理图片资源
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            }, 
            // 处理字体资源
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            // 处理 .vue 资源
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 处理 css 资源
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new FriendlyErrorWebpackPlugin()
    ]
}
