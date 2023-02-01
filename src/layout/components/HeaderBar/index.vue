<template>
  <div class="header-bar">
    <bread-crumb />
    <div class="right-bar">
      <LanguageBar />
      <el-dropdown style="margin-left: 12px;">
        <span class="el-dropdown-link">
          {{ username }}
        </span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              :icon="SwitchButton"
              @click="logout"
            >
              登出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { SwitchButton } from '@element-plus/icons-vue';
import BreadCrumb from './BreadCrumb.vue';
import LanguageBar from './LanguageBar.vue';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';

const username = localStorage.getItem('USERNAME')
const router = useRouter()
const logout = () => {
   ElMessageBox.confirm(
    '确认登出账户？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(()=> {
      localStorage.removeItem('TOKEN')
      localStorage.removeItem('USERNAME')
      router.push('/login')

      // location.reload()
  })
}
</script>
<style lang='scss' scoped>
.header-bar{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.right-bar{
  display: flex;
}
</style>