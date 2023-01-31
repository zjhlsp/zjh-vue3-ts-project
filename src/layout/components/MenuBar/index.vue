<template>
  <el-menu
    default-active="2"
    active-text-color="#409EFF"
    text-color="#fff"
    class="el-menu"
    :collapse="collapsed"
  >
    <menu-item :menus="menus" />
  </el-menu>
</template>

<script lang="ts" setup>
import MenuItem from './MenuItem.vue'
import {useStore} from '@/store'


const store = useStore()

defineProps({
  collapsed: {
    type: Boolean
  }
})

const menus = store.getters['menuStore/getMenus']


</script>

<style lang="scss">
.el-menu {
  border: none;
  background-color: $menuBg;
  height: 100%;
  .el-sub-menu {
    .el-menu-item {
      background-color: $subMenuBg;
    }
  }
}
</style>


<!-- <style lang="scss">
.el-menu {
  height: 100vh;
  width: 200px;
  min-height: 400px;
  background-color: $menuBg;
  overflow: hidden;
}
</style> -->