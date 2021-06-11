import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'dayjs/locale/zh-tw';
import locale from 'element-plus/lib/locale/lang/zh-tw';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-plus/lib/theme-chalk/index.css';
import './style/element-variables.scss';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus, { locale });
app.mount('#app');
