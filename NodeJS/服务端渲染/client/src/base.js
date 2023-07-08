import Vue from 'vue';
import App from './App';
import createRouter from './router/index';

export default function createApp(context) {
    const router = createRouter(); // 创建 router 实例

    const app = new Vue({
        render: h => h(App),
        router, // 注入 router 到根 Vue 实例
    });
    return {
        app,
        router,
    };
};