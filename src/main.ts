import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { store, key } from '../src/store/index';
import * as ElIcons from '@element-plus/icons'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
const app = createApp(App)
app.use(store, key)
app.use(router)
app.mount('#app')

for(const name in ElIcons ) {
    app.component(name,(ElIcons as any)[name])
}
