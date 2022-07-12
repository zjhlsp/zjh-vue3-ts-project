import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

// 基础配置
const CONFIG: AxiosRequestConfig<any> = {
    baseURL: '/api',
    method: 'post',
    // 请求头信息
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
    
}

const $axios = axios.create(CONFIG)

// response 拦截器
$axios.interceptors.response.use(response=>{
    const res = response.data
    if(res.code === 200) {
        return res
    } else if(res.code === 10001) {
        ElMessage.error('登陆过期，请重新登录！');
    }else if(res.code === 10002) {
        ElMessage.error('没有权限！');
    } else {
        ElMessage.error(res.message);
    }
})

export default $axios