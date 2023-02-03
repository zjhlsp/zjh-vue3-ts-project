import axiosInstance from '../axios';
type configType = {
  shopName: string,
packingPrice: number,
sendingPrice: number,
sendingNeedLeastPrice: number,
businessStartTime: number,
businessEndTime: number,
testUserLoginEnabled: boolean,
lianxidianhua1: string,
lianxidianhua2: string,
lianxiQQ: string,
shopStatus: boolean,
shopNotice: string
}
// 获取小程序的所有配置信息
export function getAppConfig(){
  return axiosInstance({
    url: '/config' ,
    method: 'get'
  })
}


// 修改配置信息
export function updateAppConfig(appConfig:configType) {
  return axiosInstance({
    url: '/config',
    method: 'put',
    data: appConfig
  })
}
