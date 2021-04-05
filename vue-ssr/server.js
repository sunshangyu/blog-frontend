const Vue = require('vue');
const fs = require('fs');
const express = require('express');
const server = express();
const { createBundleRenderer } = require('vue-server-renderer');
const setupDevServer = require('./src/setup-dev-server');
const isProd = process.env.NODE_ENV === 'production';

// 处理的是物理磁盘中饿资源
server.use('/dist', express.static('./dist'));


let renderer;
let onReady;
if (isProd) {
    // https://ssr.vuejs.org/zh/guide/bundle-renderer.html
    const serverBundle = require('./dist/vue-ssr-server-bundle.json');
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    const template = fs.readFileSync('./index.template.html', 'utf-8');
    renderer = createBundleRenderer(serverBundle, {
        template,
        clientManifest
    });
} else {
    // 开发模式 -> 监视打包构建 -> 重新生成 renderer 渲染器
    // 在开发模式下需要对 server 挂载一写中间件 // 在构建之后，执行回调函数 // 返回一个 promise
    onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
        renderer = createBundleRenderer(serverBundle, {
            template,
            clientManifest
        });
    
    });
}


const render = async (req, res) => {
    try {
        const html = await renderer.renderToString({
            title: 'Motherfucker',
            url: req.url,
        });
        res.setHeader('Content-Type', 'text/html;charset=utf8');
        res.end(html);
    } catch(err) {
        res.status(500).end('Internal Server Error.')
    }
};

server.get('*', isProd ? render : async (req, res) => {
    // 开发模式下，需要等待有了 renderer 渲染器后，再去调用 render 去渲染
    await onReady;      // 等构建完了之后，再去执行 render
    render(req, res);
});

server.listen(3000, () => {
    console.log('server running at port 3000');
});

