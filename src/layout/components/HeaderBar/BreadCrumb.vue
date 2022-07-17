<template>
  <el-breadcrumb>
    <el-breadcrumb-item
      v-for="(item, index) in breadCrumb"
      :key="index"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang='ts'>
import { onMounted, Ref, ref, watch } from 'vue';
import { RouteLocationMatched, useRoute } from 'vue-router';
const route = useRoute()

const breadCrumb: Ref<RouteLocationMatched[]> = ref([])

const getBreadCrumb = () => {
  if (route.path === '/login') {
    return
  }
  let matched = route.matched.filter((item) => item.meta && item.meta.title && item.children.length !== 1)

  const frist = matched[0]
  if (frist.path !== '/index') {
    matched = [{ path: '/index', meta: { title: '首页' } } as any].concat(matched)
  }
  breadCrumb.value = matched
}
watch(() => route.path, () => {
  getBreadCrumb()
})

// 初始化加载面包屑
onMounted(() => {
  getBreadCrumb()
})
</script>
<style lang='scss'>
</style>