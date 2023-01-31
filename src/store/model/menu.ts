import { RootState } from '../index';
import { Module } from 'vuex';
import { asyncRoutes } from '@/router/modules';
import { RouteRecordRaw } from 'vue-router'
import router from '@/router';


export interface MenuState {
    menuList: RouteRecordRaw[]
}
// foreach中使用return并不会退出循环
// const hasPermission = (perms: string[], routePerm: string) => {
//     perms.forEach((perm) => {
//         if (perm.startsWith(routePerm)) {
//             return true
//         }
//     });
//     return false
// }
function hasPermission(perms: string[], needPermission: string) {
    for (let i = 0; i < perms.length; i++) {
        if (perms[i]===(needPermission)) {
            return true
        }
    }
    return false
}
// routes: asyncRoutes, 所有路由集合
// perms: 接口获得的路由权限
const filterRouter = (routes:RouteRecordRaw[], perms: string[]):RouteRecordRaw[] => {
    const res: RouteRecordRaw[] = []
    routes.forEach(route => {
        if (route.children) {
            // 递归
            route.children = filterRouter(route.children, perms)
            // 递归中的路由直接添加
            if (route.children.length > 0) {
                res.push(route)
            }
        } else {
            if (route.meta!.permission) {
                if (hasPermission(perms, route.meta!.permission)) {
                    res.push(route)
            }
            } else {
                res.push(route)
            }
        }
    });
    return res

}
export const menuStore: Module<MenuState, RootState> = {
    namespaced: true,
    state: ():MenuState => ({
        menuList: []
    }),

    getters:{
        getMenus: state => state.menuList
    },

    mutations: {
        setMenu(state, systemMenu){
            state.menuList = systemMenu
        }
    },

    actions: {
        // 生成动态路由
        generateSystemMenus({state, commit}, perm:string[]) {
            const routers = filterRouter(asyncRoutes,perm)
            // 添加到动态路由
            routers.forEach(route=>{
                // 二级menu跳成一级menu
                if(route.redirect == null && route.children?.length == 1) {
                    route.redirect = route.path +'/' + route.children[0].path
                    route.meta = route.children[0].meta
                }
                router.addRoute(route)
            })
            
            
            // 添加动态菜单
            console.log('router',routers);
            commit('setMenu',routers)

        }
    }
}