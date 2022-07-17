import { Module } from 'vuex';
import { Itab } from '@store/type';
import { RootState } from '../index';

export interface TabState {
    tabsList: Array<any>,

}
export const tabStore: Module<TabState, RootState> ={
    namespaced: true,
    state: {
        tabsList: []
    },
    mutations: {
        // 添加tab
        addTab(state:TabState,tab:Itab) {
            const isSome = state.tabsList.some((item)=> item.path == tab.path)
            if(!isSome) {
                state.tabsList.push(tab)
            }
      },
        deleteTab (state:TabState, tab:string) {
            state.tabsList.forEach((value, index) => {
                if (value.path === tab) {
                    state.tabsList.splice(index, 1)
                }
            });
        }
    },
    getters: {
        getAddTabs (state:TabState) {
            return state.tabsList
        }
    }
}