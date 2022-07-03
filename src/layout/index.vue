<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="collapsed ? 'auto' : '200px'">
        <logoBar
          :collapsed="collapsed"
        />
        <MenuBar
          :collapsed="collapsed"
        />
      </el-aside>
      <el-container>
        <el-header>
          <el-row>
            <el-icon
              style="font-size: 16px;"
              @click="() => {collapsed= !collapsed}"
            >
              <component
                :is="collapsed ? Expand : Fold"
              />
            </el-icon>
          </el-row>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import logoBar from './components/LogoBar/index.vue'
import MenuBar from './components/MenuBar/index.vue'
import { Expand, Fold } from '@element-plus/icons-vue';
import { ref } from 'vue';

const collapsed = ref<boolean>(false)
</script>

<style lang="scss">
.common-layout {
    height: 100vh;
    display: flex;
}

.el-aside {
  overflow: hidden;
  border: none;
}

.el-header {
  display: flex;
  align-items: center;
}
</style>