import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { Itab } from './type';
import { InjectionKey } from 'vue'
// store模块
import {TabState, tabStore} from './model/tabs'
import {LoginState, loginStore} from './model/login'

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()
// export interface RootState 
export interface RootState {
    tabStore:TabState,
    loginStore:LoginState,
}

export const store:Store<RootState> = createStore({
    modules:{
        tabStore,
        loginStore
    }
})

interface State {
    tabsList: Array<Itab>
} 


export function useStore () {
    return baseUseStore(key)
  }