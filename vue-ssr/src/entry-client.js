/* 客户端入口 */

import { createApp } from './app';

// 客户端特定引导逻辑

// 此步骤得到了一个 Vue 对象，模板是 App.vue
const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

// 这里假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
    app.$mount('#app');
});


// app.$mount('#app');
