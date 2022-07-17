import $axios from './axios';

// 获取登录验证码
const getVerifyCode = () => {
    return $axios({
        url: '/auth/code',
        method: 'GET'
    })
}

// 用户登录(账户密码登录)
const accountLogin = (data:object) => {
    return $axios({
        url: '/auth/login',
        method: 'POST',
        data
    })
}

// token登录
const tokenLogin = (token: string) => {
    return $axios({
        url: `/auth/loginByToken?token=${token}`,
        method: 'POST'
    })
}

export const loginAPI = {
    getVerifyCode,
    accountLogin,
    tokenLogin
}