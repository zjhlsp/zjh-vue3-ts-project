import { RootState } from '../index';
import { Module } from 'vuex';
import router from '@/router';
import { asyncRoutes } from '@router/modules';
import { RouteRecordRaw } from 'vue-router'


export interface MenuState {
    menuList: RouteRecordRaw[]
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
        generateSystemMenus({state, commit}, perm:string[]) {
            
        }
    }
}