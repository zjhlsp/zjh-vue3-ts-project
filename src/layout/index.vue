<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        Aside
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup lang="ts">

</script>

<style lang="scss">
.common-layout {
    height: 100vh;
    display: flex;
}
</style>