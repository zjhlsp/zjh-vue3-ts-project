import { RootState } from '../index';
import { Module } from 'vuex';
import { loginAPI } from '@/api/login';
import router from '@/router';


export interface LoginState {
    token: string,
    username: string,
    role: string,
    userInfo: object
}

export const loginStore: Module<LoginState, RootState> = {
    namespaced: true,
    state: {
        username: '',
        token: '',
        role: '',
        userInfo: {}
    },
    // 无法进行异步操作
    mutations: {
        // 存储TOKEN
        addToken(state: LoginState, token: string) {
            state.token = token
        },
        addUserInfo(state: LoginState, userInfo: object) {
            state.userInfo = userInfo
        }
    },
    getters: {
        getToken(state: LoginState) {
            return state.token
        }
    },

    // 替代mutations进行任何异步操作，比如调接口等等
    actions: {
        // 账户密码登录
        login({ commit }, loginParams: any) {
            loginAPI.accountLogin(loginParams).then((res) => {
                commit('addToken', res.data.token)
                commit('addUserInfo', res.data)
                router.push({ path: '/index' })
                //本地存储token
                localStorage.setItem('TOKEN', res.data.token)
                localStorage.setItem('USERNAME', res.data.username)

            })
        },

        // token登录
        loginByToken({ commit }, token: string) {
            commit('addToken', token)

            loginAPI.tokenLogin(token).then((res:any) => {
                commit('addUserInfo', res.data)
                //本地存储token
                localStorage.setItem('TOKEN', res.data.token)
                localStorage.setItem('USERNAME', res.data.username)
                if (res.data.status) {
                    router.push({ path: '/index' })
                }
            }).catch(() => {
                localStorage.removeItem('TOKEN')
            })
        }

    }
}