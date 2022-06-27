import { createApp } from 'vue'
import App from './App.vue'
import router from '../router/index'
import { store } from "../src/store/index";
createApp(App).use(router).use(store).mount('#app')
