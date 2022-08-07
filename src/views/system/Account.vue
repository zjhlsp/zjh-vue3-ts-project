<!--  -->
<template>
  <div class="userTable">
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
      <el-table-column
        label="状态"
      >
        <!-- :before-change="changeStatus(scope.row.status, scope.row.id)" -->
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="toSetRole(scope.row.id)"
          >
            授权
          </el-button>
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
            @click="toEditUser(scope.row)"
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
  </div>
</template>

<script setup lang='ts'>
import { userAPI } from '@/api/system/user';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
onMounted(() => {
  getTableList()
})
const state = reactive({
  tableData: [] // table数据
})

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
</script>
<style lang='scss' scoped>
</style>