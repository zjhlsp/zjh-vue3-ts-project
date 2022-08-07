import $axios from '../axios';

 // 获取所有角色
 const getAllRoles = () => {
    return $axios({
      url: '/role/list',
      method: 'get'
    })
  }
  
  // 获取角色所有权限
  const getPermissionsOfRole = (roleId:object) => {
    return $axios({
      url: '/role/perms/' + roleId,
      method: 'get'
    })
  }
  
  // 添加角色
  const addRole = (user:object) => {
    return $axios({
      url: '/role/',
      method: 'post',
      data: user
    })
  }
  
  // 更新角色
  const updateRole = (role:object) => {
    return $axios({
      url: '/role',
      method: 'put',
      data: role
    })
  }
  
  // 批量删除角色
  const deleteRoles = (roleIds:number[]) => {
    return $axios({
      url: '/role/batch',
      method: 'delete',
      data: roleIds
    })
  }
  
  // 修改角色的权限
  const updateRolePermission = (userIdAndPermissions:object) => {
    return $axios({
      url: '/role/permission',
      method: 'put',
      data: userIdAndPermissions
    })
  }

  export const roleAPI = {
    getAllRoles,
    getPermissionsOfRole,
    addRole,
    updateRole,
    deleteRoles,
    updateRolePermission
}
  