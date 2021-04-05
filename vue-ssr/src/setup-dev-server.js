const fs = require('fs');
const path = require('path');
const resolvePath = (dirname => filePath => path.resolve(dirname, filePath))(__dirname);
const chokidar = require('chokidar');
const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

module.exports = (server, callback) => {
    return new Promise(resolve => {
        // 监视构建 -> 更新 Renderer
        let serverBundle, template, clientManifest;

        const update = () => {
            if (template && serverBundle && serverBundle) {
                resolve();
                callback(serverBundle, template, clientManifest);
            }
        }

        // 监视构建 template -> 调用 update -> 更新 Renderer 渲染器
        const templatePath = resolvePath('../index.template.html');
        template = fs.readFileSync(templatePath, 'utf-8');
        update();
        chokidar.watch(templatePath).on('change', () => {       // 监听 文件改变事件
            template = fs.readFileSync(templatePath, 'utf-8');
            update();
        });
        // 监视构建 serverBundle -> 调用 update -> 更新 Renderer 渲染器
        const serverConfig = require('../webpack.server.config');
        const serverComiler = webpack(serverConfig);
        const serverDevMiddleware = WebpackDevMiddleware(serverComiler, {
            logLevel: 'silent'      // 关闭日志输出，由 FriendlyErrorWebpackPlugin 统一管理日志
        });
        serverComiler.hooks.done.tap('server', () => {
            serverBundle = JSON.parse(serverDevMiddleware.fileSystem.readFileSync(resolvePath('../dist/vue-ssr-server-bundle.json'), 'utf-8'));
            update();
        });
        /* serverComiler.watch({}, (err, stats) => {
            if (err) throw err;     // 打包过程的错误，比如配置错误
            if (stats.hasErrors()) return;  // 源代码中的错误
            serverBundle = JSON.parse(fs.readFileSync(resolvePath('../dist/vue-ssr-server-bundle.json'), 'utf-8'));
            update();
        }); */
        // 监视构建 serverBundle -> 调用 update -> 更新 Renderer 渲染器
        const clientConfig = require('../webpack.client.config');
        clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());        // 添加热更新插件
        clientConfig.entry.app = [
            'webpack-hot-middleware/client?quiet=true&reload=true',                         // 和服务端交互处理热更新一个客户端脚本
            clientConfig.entry.app
        ]; 
        clientConfig.output.filename = '[name].js';             // 热更新模式下确保文件名称一致
        const clientComiler = webpack(clientConfig);
        const clientDevMiddleware = WebpackDevMiddleware(clientComiler, {
            publicPath: clientConfig.output.publicPath,
            logLevel: 'silent'      // 关闭日志输出，由 FriendlyErrorWebpackPlugin 统一管理日志
        });
        clientComiler.hooks.done.tap('client', () => {
            clientManifest = JSON.parse(clientDevMiddleware.fileSystem.readFileSync(resolvePath('../dist/vue-ssr-client-manifest.json'), 'utf-8'));
            update();
        });
        // 将 clientDevMiddleware 挂载到 Express 服务中，提供对其内部内存中数据的访问
        server.use(clientDevMiddleware);
        // 添加热更新中间件
        server.use(webpackHotMiddleware(clientComiler, {
            log: false              // 关闭它本身的日志输出
        }));
        /* clientComiler.watch({}, (err, stats) => {
            if (err) throw err;     // 打包过程的错误，比如配置错误
            if (stats.hasErrors()) return;  // 源代码中的错误
            clientManifest = JSON.parse(fs.readFileSync(resolvePath('../dist/vue-ssr-client-manifest.json'), 'utf-8'));
            update();
        }); */
    });
}
