<!--  -->
<template>
  <template
    v-for="menu in menus"
    :key="menu.path"
  >
    <el-sub-menu
      v-if="menu.children && menu.children.length >1 "
      :index="menu.path"
    >
      <template #title>
        <el-icon>
          <component :is="menu.meta.icon" />
        </el-icon>
        <span>{{ $t(menu.meta.title) }}</span>
      </template>
      <menu-item :menus="menu.children" />
    </el-sub-menu>
    <el-menu-item
      v-else
      :index="menu.path"
      @click="toPath(menu.name)"
    >
      <el-icon>
        <component :is="menu.meta.icon" />
      </el-icon>
      <span>{{ $t(menu.meta.title) }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';


    defineProps(['menus'])
    const route = useRouter()
    const toPath = (item:string) => {
      route.push({name: item})
    }
</script>
<style lang='scss' scoped>
</style>