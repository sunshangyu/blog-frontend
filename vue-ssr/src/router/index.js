import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/pages/Home';

Vue.use(VueRouter);

export const createRouter = () => {
    const router = new VueRouter({
        mode: 'history',      // SSR 必须使用 history 模式
        routes: [
            {
                path: '/',
                name: 'home',
                component: Home
            },
            {
                path: '/about',
                name: 'about',
                component: () => import('@/pages/About')
            },
            {
                path: '/posts',
                name: 'posts',
                component: () => import('@/pages/Posts')
            },
            {
                path: '*',
                name: 'error404',
                component: () => import('@/pages/NOTFOUND')
            }
        ]

    });

    return router;
}