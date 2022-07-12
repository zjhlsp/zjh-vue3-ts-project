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
    port: 3000,
    proxy: {
      '/api': {
        // 后端 URL，它会追加到属性名配置的 /api 这个片段的前面 => http://106.52.235.252:8101/api
        target: 'http://106.52.235.252:8101/',
        // 允许跨域
        changeOrigin: true,
        // 重写：将/api去掉
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
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
