<!--  -->
<template>
  <div class="userTable">
    <div style="text-align: left; margin: 5px 10px;">
      <el-button
        type="primary"
        @click="addUser"
      >
        新增用户
      </el-button>
    </div>
    <el-table
      :data="state.tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="username"
        label="用户名"
        width="150"
      />
      <el-table-column
        prop="roleName"
        label="角色"
        width="120"
      />
      <el-table-column label="状态">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="green"
            inactive-color="red"
            @change="(value: boolean) => changeStatus(value, scope.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="resetPw(scope.row.id)"
          >
            重置密码
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="editUser(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="deleteUser(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddOrEditUser
      :value="state.showDialog"
      :is-edit="state.isEdit"
      :user-info="state.userInfo"
      @close-dialog="state.showDialog = false"
      @refresh="getTableList"
    />
  </div>
</template>

<script setup lang='ts'>
import { userAPI } from '@/api/system/user';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, reactive } from 'vue';
// 引入组件
import AddOrEditUser from './component/AddOrEditUser.vue';

interface USERINFO {
  depId?: string | number
  id?: number
  roleId?: number
  roleName?: string
  status?: boolean
  username?: string
}

onMounted(() => {
  getTableList()
})

const state = reactive({
  tableData: [], // table数据
  showDialog: false,
  users: [],
  currentPage: 1,
  pageSize: 10,
  isEdit: false,
  userInfo: {}
})

// const userInfo:USERINFO = reactive({})

// 获取列表数据
const getTableList = () => {
  userAPI.getAllSysUsers().then((res: any) => {
    state.tableData = res.data;
  })
}

// 改变用户状态
const changeStatus = (status: boolean, sysUserId: number) => {
  return new Promise<void>((resolve, reject) => {
    userAPI.updateStatus(sysUserId, status).then((res: any) => {
      if (res.code === 200) {
        resolve
        ElMessage.success('操作成功')
      } else reject
    })
  })
}

// 添加用户
const addUser = () => {
  state.isEdit = false
  state.showDialog = true
}

// 修改用户
const editUser = (row: USERINFO) => {
  state.isEdit = true
  state.showDialog = true
  state.userInfo = row
}

// 重置密码
const resetPw = (id: number) => {
    ElMessageBox.confirm('确认要重置当前用户吗?').then(() => {
    userAPI.resetPassword(id).then(() => {
      ElMessage.success('重置成功')
      getTableList()
    })
  })
}

// 删除用户
const deleteUser = (id: number) => {
  ElMessageBox.confirm('确认要删除当前用户吗?').then(() => {
    userAPI.deleteSysUsers(id).then(() => {
      ElMessage.success('删除成功')
      getTableList()
    })
  })
}

</script>
<style lang='scss' scoped>
</style>