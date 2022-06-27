import { defineConfig } from 'vite'
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
      "@": path.resolve(__dirname, 'src'),
      "com": path.resolve(__dirname, 'src/components')
    }
  },
  plugins: [vue()]
})
