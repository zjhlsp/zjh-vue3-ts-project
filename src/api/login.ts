import $axios from './axios';

// 获取登录验证码
const getVerifyCode = () => {
    return $axios({
        url: '/auth/code',
        method: 'GET'
    })
}

// 用户登录
const accountLogin = (data:object) => {
    return $axios({
        url: '/auth/login',
        method: 'POST',
        data
    })
}

export const loginAPI = {
    getVerifyCode,
    accountLogin
}