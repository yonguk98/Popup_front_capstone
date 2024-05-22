import { createApp } from 'vue'
import './input.css'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'
import { createNaverMap } from "vue3-naver-maps";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(createNaverMap, {
    clientId: "hucjy7m1er",
    category: "ncp",
    subModules: [],
});
app.mount('#app');
