<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="collapsed ? 'auto' : '200px'">
        <logoBar :collapsed="collapsed" />
        <MenuBar :collapsed="collapsed" />
      </el-aside>
      <el-container>
        <el-header>
          <el-icon
            style="font-size: 20px; margin-right: 16px;"
            @click="() => { collapsed = !collapsed }"
          >
            <component :is="collapsed ? Expand : Fold" />
          </el-icon>
          <HeaderBar style="margin-top: 3px;" />
        </el-header>
        <el-main class="main">
          <TabBar />
          <AppMain />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import logoBar from './components/LogoBar/index.vue'
import MenuBar from './components/MenuBar/index.vue'
import HeaderBar from './components/HeaderBar/index.vue'
import { Expand, Fold } from '@element-plus/icons-vue';
import AppMain from './AppMain/AppMain.vue';
import { ref } from 'vue';
import TabBar from './components/TabBar/TabBar.vue'

const collapsed = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  display: flex;
  overflow: hidden;

  .main {
    padding:0%
  }

  .el-aside {
    overflow: hidden;
    border: none;
    height: 100%;
  }

  .el-header {
    display: flex;
    align-items: center;
    background-color: $lightGray;
  }
  .header {
    display: flex;
    justify-content: space-between;
  }
}
</style>