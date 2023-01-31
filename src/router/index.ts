
import {createRouter,createWebHashHistory,RouteRecordRaw} from 'vue-router'
import Layout from '@/layout/index.vue'
import { store } from '@/store'
import { loginAPI } from '@/api/login'

const routes:Array<RouteRecordRaw> = [
  {
    path:'/login',
    component: () => import('@/views/login/Login.vue')
}
]

const router = createRouter({
    history:createWebHashHistory(),
    routes:routes
})


//判断登录状态的路由守卫
router.beforeEach((to,from,next) => {
  const token = localStorage.getItem('TOKEN')
  //store和本地均无token
  if (!store.state.loginStore.token && !token) {
    if (to.path.startsWith('/login')) {
      next()
    } else next('/login')
    // 只有本地有token，进行token登录，并进行权限验证
  } else if (!store.state.loginStore.token && token) {
    loginAPI.tokenLogin(token).then((res) => {
      console.log(res);
      if (res.data.status) {
        store.commit('loginStore/addUserInfo', res.data)
        next()
      } else next('/login')
    })
  } else next()
})

export default router