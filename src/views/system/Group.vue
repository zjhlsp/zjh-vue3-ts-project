<!--  -->
<template>
  <div>
    <div style="text-align: left; margin: 5px 10px;">
      <el-button
        type="primary"
        @click="addUser"
      >
        新增角色
      </el-button>
    </div>
    <div>
      <el-table 
        :data="state.tableData"
      > 
        <el-table-column 
          prop="name"
          label="角色"
          min-width="150"
        />
        <el-table-column 
          prop="description"
          label="描述"
          min-width="300"
        />
        <el-table-column 
          v-slot="scope"
          prop="active"
          label="操作"
          min-width="200"
        >
          <el-button
            type="text"
            @click="handleClick(scope.row)"
          >
            授权
          </el-button>
          <el-button
            type="text"
            @click="editRole(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            @click="deleteRole(scope.row.id)"
          >
            删除
          </el-button>
        </el-table-column>
      </el-table>
    </div>
    <AddOrEditRole
      :value="state.showDialog"
      :is-edit="state.isEdit"
      :role-info="state.roleInfo"
      @close-dialog="state.showDialog = false"
      @refresh="_getAllRoles"
    />
  </div>
</template>

<script setup lang='ts'>
import { ElMessage, ElMessageBox } from 'element-plus';
import { roleAPI } from '@/api/system/role';
import AddOrEditRole from './component/AddOrEditRole.vue';
import { onMounted,  reactive } from 'vue';

// 获取所有角色
onMounted(() => {
  _getAllRoles()
})

const state = reactive({
  tableData: [],
  showDialog: false,
  isEdit: false,
  roleInfo:{}
})
const _getAllRoles = () => {
  roleAPI.getAllRoles().then((res: any) => {
    state.tableData = res.data
  })
}

const handleClick = (row:object) => {
  console.log(row);
}

// 添加用户
const addUser = () => {
  state.isEdit = false
  state.showDialog = true
}

// 修改用户
const editRole = (row:object) => {
  state.isEdit = true
  state.showDialog = true
  state.roleInfo = JSON.parse(JSON.stringify(row))
}

// 删除用户
const deleteRole = (id: number) => {
  ElMessageBox.confirm('确认要删除当前角色吗?').then(() => {
    roleAPI.deleteRoles([id]).then(() => {
      ElMessage.success('删除成功')
      _getAllRoles()
    })
  })
}
</script>
<style lang='scss' scoped>
</style>