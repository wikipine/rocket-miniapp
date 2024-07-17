import { createSSRApp } from "vue";
import * as Pinia from "pinia";

// 注册全局组件
import device from './utils/device'
import goto from './utils/goto'
import cache from './utils/cache'

import App from "./App.vue";

export function createApp() {
	const app = createSSRApp(App);
    app.use(Pinia.createPinia());

    // 全局加载组件
    app.config.globalProperties.$device = device;
    app.config.globalProperties.$cache = cache;
    app.config.globalProperties.$goto = goto;

	return {
		app,
	};
}
