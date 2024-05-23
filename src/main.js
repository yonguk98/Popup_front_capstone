import { createApp } from 'vue'
import './input.css'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'
import { createNaverMap } from "vue3-naver-maps";

const app = createApp(App);
const pinia = createPinia();
const clientId = import.meta.env.VITE_clientId;

app.use(router);
app.use(pinia);
app.use(createNaverMap, {
    clientId: clientId,
    category: "ncp",
    subModules: [],
});
app.mount('#app');
