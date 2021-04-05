/* 通用启动入口 */
import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import VueMeta from 'vue-meta';
import { createStore } from './store';
Vue.use(VueMeta);
Vue.mixin({
    metaInfo: {
        titleTemplate: '%s - You Motherfucker',                  // 最终的标题会放到  %s  那里
    }
});
// 导出一个工厂函数，用于创建新的应用程序、router 和 store 实例
export function createApp() {
    const router = createRouter();
    const store = createStore();
    const app = new Vue({
        router,         // 挂载路由
        store,
        render: h => h(App),
    });
    return { app, router, store };
    // return { app };
}
