<template>
  <div>
    <el-tabs
      v-model="activeKey"
      type="card"
      @tab-click="handleClick"
      @tab-remove="handleRemove"
    >
      <el-tab-pane
        v-for="item in tabsList"
        :key="item.title"
        :label="item.title"
        :name="item.path"
        closable
      >
        {{ item.title }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang='ts'>

import { Itab } from '@/store/type'
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';
import { ElMessage } from 'element-plus'

const route = useRoute()
const store = useStore()
const router = useRouter()
const tabsList = computed(() => {
  return store.getters['tabStore/getAddTabs']
})


// tabs索引 当前路由
const activeKey = ref('')

//路由跳转的时候添加tab选项的方法
const addTab = () => {
  const { path, meta } = route
  const tab: Itab = {
    path: path,
    title: meta.title as string
  }
  store.commit('tabStore/addTab', tab)
}

const refresh = () => {
  // 监听浏览器刷新事件，session中存入tablist
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('TABS_ROUTERS', JSON.stringify(tabsList.value))
  })

 // 取出session中的tabsList
  let session = sessionStorage.getItem('TABS_ROUTERS')
  if (session) {
    JSON.parse(session).forEach((item:Itab) => {
      store.commit('tabStore/addTab', item)
    });
  }
}

// 先刷新tabslist
refresh()

//再监听路由
watch(() => route.path, () => {
  addTab()
  activeKey.value = route.path
},{immediate: true})

const handleClick = (event:any) => {
  const tabClick = event.props.name
  router.push({ path: tabClick })
}

const handleRemove = (event: string) => {
  if (tabsList.value.length === 1) {
    ElMessage.error('已经是最后一页');
    return
  }

  // 如果删除tab为当前页
  if (activeKey.value === event) {
    tabsList.value.forEach((value: Itab, index: number) => {
      if (value.path === activeKey.value) {
        const nextTab = tabsList.value[index + 1] || tabsList.value[index - 1]
        router.push({ path: nextTab.path })
        activeKey.value = nextTab
      }
    });
  }
  store.commit('tabStore/deleteTab', event)

}




</script>
<style lang='scss'>
</style>