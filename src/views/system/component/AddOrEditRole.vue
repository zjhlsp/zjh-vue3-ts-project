<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-dialog
    v-model="value"
    width="450px"
    :title="isEdit ? '编辑角色' : '新增角色'"
    @close="$emit('closeDialog')"
  >
    <el-form
      ref="form"
      label-width="auto"
      :model="state.formData"
      :rules="state.validateForm"
    >
      <el-form-item
        label="角色名："
        prop="name"
      >
        <el-input
          v-model="state.formData.name"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item
        label="描述"
        prop="description"
      >
        <el-input
          v-model="state.formData.description"
          placeholder="请输入用户名"
        />
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
import { roleAPI } from '@/api/system/role';
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
    roleInfo: {
      type: Object,
      default() {
        return{}
      }
    }
})

const emit = defineEmits(['closeDialog', 'refresh'])
watch( () => props.value, () => {
  if (props.value) {
    props.isEdit && (state.formData = props.roleInfo as {name:string, description: string })
    console.log(props.roleInfo);
  } else {
    state.formData = {name:'', description: ''}
  }
})
// 表单数据以及校验
const state = reactive({
    formData: {
        name: '',
        description: ''
        // password: ''
    },
    validateForm: {
        name: [
            {
                required: true,
                message: '请输入角色名',
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
              roleAPI.addRole(state.formData).then(res => {
                    if (res.data == 1) {
                        ElMessage.success('添加成功')
                        emit('refresh')
                        emit('closeDialog')
                    }

                })
            } else {
              roleAPI.updateRole(state.formData).then(() => {
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