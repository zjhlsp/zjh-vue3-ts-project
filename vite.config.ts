import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  // node服务
  server: {
    // 端口
    port: 8080
  },
  resolve: {
    // 配置别名
    alias: {
      // 配置路径别名， __dirname表示当前路径
      '@': path.resolve(__dirname, 'src'),
      'com': path.resolve(__dirname, 'src/components')
    }
  },
  css:{
    //css预处理
    preprocessorOptions:{
      scss:{
        //引入varibles.scss全局预定义变量
        additionalData:'@import "./src/styles/variables.scss";'
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })]
})
