<template>
  <el-form
    ref="form"
    label-width
    :label-position="labelPosition"
    :rules="rules"
    :model="formData"
    :style="`display: grid;grid-template-columns: repeat(${columnNum||1}, 1fr); gap:0px`"
  >
    <div
      v-for="item in dataItems" 
      :key="item?.id"
      :style="{'grid-column-start': `span ${item?.span||(item?.title?columnNum:1)}`}"
    >
      <!-- 小标题 -->
      <template v-if="item?.title">
        <div class="form-title">
          {{ item?.title }}
        </div>
      </template>
      <el-form-item
        v-else-if="!item?.hidden && !item.title"
        :key="item.id"
        :label="item?.label"
        :prop="item?.id"
        :style="item.itemStyle"
      >
        <el-input 
          v-if="(item.itemType==='input' || !item.itemType)"
          v-model.trim="formData[item.id]"
          :show-password="item.password"
          clearable
          :placeholder="item.place||'请输入'"
          :disabled="item.disabled"
          :readonly="item.readonly"
          :type="item.type"
          @keydown.enter.prevent="item.onEnter"
          @blur="item.onBlur"
          @change="item.onChange"
        />
        <el-select
          v-if="(item.itemType==='select')"
          v-model.trim="formData[item.id]"
          :multiple="item.multiple"
          :clearable="item.clear"
          :disabled="item.disabled"
          :filterable="item.filter"
          :allow-create="item.allowCreate"
          :placeholder="item.place||'请选择'"
          style="width:100%"
          @change="item.onChange"
          @visible-change="item.onVisibleChange"
        >
          <el-option
            v-for="option in item.options"
            :key="option.value"
            :value="option.value"
            :label="option.label"
          >
            {{ option.label }}
          </el-option>
        </el-select>
        <el-button
          v-else-if="item.itemType==='button'"
          :type="item.type"
          @click="(val:FormInstance) => {item.onClick(val)}"
        >
          {{ item.label }}
        </el-button>
        <!-- text -->
        <div v-else-if="item.itemType==='text'">
          {{ item.content || formData[item.id] }}
        </div>

        <!-- slot 特殊项 -->
        <!-- <slot
          v-else-if="item.itemType==='slot'"
          :name="item.id"
        /> -->
      </el-form-item>
    </div>
  </el-form>
</template>
<script setup lang='ts'>
import type { FormInstance, FormRules, FormValidateCallback } from 'element-plus'
import { ref } from 'vue';

interface itemData {
    id: string,
    title?: string,
    label?: string,
    place?: string,
    hidden?: boolean,
    [key: string]: any
}
interface formData {
    [key: string]: any
}
defineProps<{
  // 表单项
  dataItems: itemData[]
  // 表单数据
  formData: formData
  // 标签长度
  labelWidth?: number | string
  // 校验规则
  rules?: FormRules
  // 一行表单元素个数
  columnNum?: number
  labelPosition?: string
}>()

const form = ref<FormInstance>()


// 校验表单
const validate = (cb: FormValidateCallback | undefined):void | boolean => {
  if (!form.value) {
    return
  }
  if (cb instanceof Function) {
    form.value.validate(cb)
  } else {
    let valid = false
    form.value.validate((val:boolean) => {
      valid = val
      return valid
    })
  }
}
// 重置表单
const resetFields = () => {
  if (form.value) {
    form.value.resetFields()
  }
}

// 单条校验
const validateField = () => {
  if (form.value) {
    form.value.validateField()
  }
}
// 暴露方法
defineExpose({
  validate,
  resetFields,
  validateField
})
</script>
<style lang='scss'>
.form-title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 16px;
    margin-top: 16px;
    }
</style>