<!--  -->
<template>
  <div class="content">
    <div style="width:460px">
      <Form
        ref="form"
        :data-items="dataItem"
        label-width="auto"
        :rules="state.validateForm"
        :form-data="state.formData"
      />
    </div>
    <div>
      <el-button
        @click="() => {state.status = state.status === 'edit' ? 'read' : 'edit'}"
      >
        {{ state.status === 'edit' ? '保存' : '编辑' }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import Form from '@/components/MyForm/Form.vue';
import { computed, onMounted, reactive } from 'vue';
import { getAppConfig } from '@/api/system/setting'

export type configType = {
  name: string,
  packingPrice: number,
  sendingPrice: number,
  sendingNeedLeastPrice: number,
  businessStartTime: number,
  businessEndTime: number,
  shopStatus: string,
  shopNotice: string
}

const state = reactive({
  status: 'read',
  // 表单数据
  formData: {
    name: '山野食堂',
    packingPrice: '',
    sendingPrice: '',
    sendingNeedLeastPrice: '',
    businessStartTime: null,
    businessEndTime: null,
    shopStatus: '',
    shopNotice: ''
  },
  // 校验规则
  validateForm:{
    name: {required: true},
    packingPrice: {required: true},
    sendingPrice: {required: true},
    sendingNeedLeastPrice: {required: true},
    shopStatus: {required: true},
    shopNotice: {required: true}
  }
})

const dataItem = computed(() => {
  const type = state.status === 'edit' ? 'input' : 'text'
  const value = [
  {title: '详细信息'},
  {id: 'name', itemType: type, label: '店铺名称：'},
  {id: 'shopStatus', itemType: type, label: '营业状态：'},
  {id: 'shopNotice', itemType: type, label: '小程序菜单栏上的公告：'},
  {id: 'sendingPrice', itemType: type, label: '外卖配送费(单位: 分)：'},
  {id: 'packingPrice', itemType: type, label: '外卖打包费(单位: 分)：'},
  {id: 'sendingNeedLeastPrice', itemType: type, label: '外卖起送价格(单位: 分)：'},
  {id: 'businessStartTime', itemType: 'text', label: '营业时间段开始时间(0-24点)：'},
  {id: 'businessEndTime', itemType: 'text', label: '营业时间段结束时间(0-24点)：'}
]
return value
})

onMounted(() => {
  getFormData()
})

const getFormData = () => {
  getAppConfig().then((result) => {
    Object.assign(state.formData, result.data)
    state.formData.shopStatus = state.formData.shopStatus ? '营业中' : '暂停营业'
  })
}
</script>
<style lang='scss' scoped>
.content{
  margin-left: 64px 
}
</style>