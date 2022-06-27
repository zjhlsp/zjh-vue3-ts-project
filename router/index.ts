import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/components/DefaultProps.vue')
    },
]
// const routes: RouteRecordRaw[]= [
//     {
//     path: '/',
//     component:  () => import ('../src/components/DefaultProps.vue')
// }]
const router = createRouter({
    history:createWebHashHistory(),
    routes:routes
})

export default router
