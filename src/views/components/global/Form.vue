<template>
  <el-form
    ref="form"
    label-width
  >
    <div />
  </el-form>
</template>
<script setup lang='ts'>
defineProps({
    // 标签长度
    labelWidth:{
        type: [String, Number],
        default: 100
    },
    // 规则
    rules: {
        type: [Array]
    }
})
</script>
<style lang='scss'>
</style>