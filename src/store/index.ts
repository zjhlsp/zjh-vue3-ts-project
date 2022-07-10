import { createStore } from 'vuex';
import { Itab } from './type';
interface State {
    tabsList: Array<Itab>
}

export const store = createStore<State>({
    state: {
        tabsList: []
    },
    mutations: {
        addTab (state:State, tab:Itab) {
            const isSome = state.tabsList.some(item => item.path == tab.path)
            !isSome && state.tabsList.push(tab)
        },
        deleteTab (state:State, tab:string) {
            state.tabsList.forEach((value, index) => {
                if (value.path === tab) {
                    state.tabsList.splice(index, 1)
                }
            });
        }
    },
    getters: {
        getAddTabs (state:State) {
            return state.tabsList
        }
    }
})