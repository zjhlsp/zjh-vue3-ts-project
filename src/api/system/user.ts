import $axios from '../axios';

interface UserInfo {
    username:string
}

const getAllSysUsers = () => {
    return $axios({
      url: '/sysUser/list',
      method: 'get'
    })
  }
  
  // 添加管理员
  const addSysUser = (user:UserInfo) => {
    return $axios({
      url: '/sysUser/',
      method: 'post',
      data: user
    })
  }
  
  // 更新管理员
  const updateSysUser = (user:UserInfo) => {
    return $axios({
      url: '/sysUser/',
      method: 'put',
      data: user
    })
  }
  
  // 删除管理员
  const deleteSysUsers = (sysUserIds:number) => {
    return $axios({
      url: '/sysUser/batch',
      method: 'delete',
      data: sysUserIds
    })
  }
  
  // 更新账号激活状态
  const updateStatus = (sysUserId:number, status:boolean) => {
    return $axios({
      url: '/sysUser/status/' + sysUserId + '/' + status,
      method: 'put'
    })
  }
  
  // 重置密码
  const resetPassword = (sysUserId:number) => {
    return $axios({
      url: '/sysUser/resetPassword/' + sysUserId,
      method: 'put'
    })
  }
  
  
  // 设置角色
  const setRole = (userId:number, roleId:number) => {
    return $axios({
      url: '/sysUser/role/' + userId + '/' + roleId,
      method: 'put'
    })
  }

  export const userAPI = {
    getAllSysUsers,
    addSysUser,
    updateSysUser,
    deleteSysUsers,
    updateStatus,
    resetPassword,
    setRole
}
  