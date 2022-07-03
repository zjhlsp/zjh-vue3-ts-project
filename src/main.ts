import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { store } from '../src/store/index';
import * as ElIcons from '@element-plus/icons'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

for(const name in ElIcons ) {
    app.component(name,(ElIcons as any)[name])
}
