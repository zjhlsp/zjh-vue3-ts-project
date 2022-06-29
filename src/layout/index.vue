<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <side-bar />
        <MenuBar />
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import SideBar from './components/LogoBar/index.vue'
import MenuBar from './components/MenuBar/index.vue'
</script>

<style lang="scss">
.common-layout {
    height: 100vh;
    display: flex;
}
</style>