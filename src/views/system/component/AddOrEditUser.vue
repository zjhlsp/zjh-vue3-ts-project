<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-dialog
    v-model="value"
    width="450px"
    :title="isEdit ? '编辑用户' : '新增用户'"
    @close="$emit('closeDialog')"
  >
    <el-form
      ref="form"
      label-width="auto"
      :model="state.formData"
      :rules="state.validateForm"
    >
      <el-form-item
        label="用户名："
        prop="username"
      >
        <el-input
          v-model="state.formData.username"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item
        label="角色："
        prop="roleId"
      >
        <el-select
          v-model="state.formData.roleId"
          placeholder="请选择角色（虚拟）"
        >
          <el-option
            v-for="item in state.roles"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('closeDialog')">取消</el-button>
        <el-button
          type="primary"
          @click="handelConfirm"
        >确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang='ts'>
import { userAPI } from '@/api/system/user';
import { ElMessage } from 'element-plus';
import { reactive, ref, watch } from 'vue';

const props = defineProps({
    value: {
        type: Boolean,
        default() {
            return false
        }
    },
    isEdit: {
        type: Boolean,
        default() {
            return true
        }
    },
    userInfo: {
      type: Object,
      default() {
        return{}
      }
    }
})

const emit = defineEmits(['closeDialog', 'refresh'])
watch( () => props.value, () => {
  if (props.value) {
    props.isEdit && (state.formData = props.userInfo as {username:string, roleId: number })
    console.log(props.userInfo);
  } else {
    state.formData = {username:'', roleId: 1}
  }
})
// 表单数据以及校验
const state = reactive({
    formData: {
        username: '',
        roleId: 1
        // password: ''
    },
    roles: [
      { id: 1, name: '超级管理员'},
      { id: 2, name: '后台管理员'},
      { id: 3, name: '游客'}
    ],
    validateForm: {
        username: [
            {
                required: true,
                message: '请输入用户名',
                trigger: 'blur'
            }
        ]
    }
})

const form = ref()

// 确认添加或修改用户
const handelConfirm = () => {
    form.value.validate((valid: boolean) => {
        if (valid) {
            if (!props.isEdit) {
                userAPI.addSysUser(state.formData).then(res => {
                    if (res.data == 1) {
                        ElMessage.success('添加成功')
                        emit('refresh')
                        emit('closeDialog')
                    }

                })
            } else {
                userAPI.updateSysUser(state.formData).then(() => {
                    ElMessage.success('更新成功')
                    emit('refresh')
                    emit('closeDialog')
                })
            }
        }
    })

}

</script>
<style lang='scss'>
</style>