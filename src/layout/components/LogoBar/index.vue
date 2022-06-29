<template>
  <div class="logo">
    <img src="@/assets/JOE.png">
    <h2 class="title">
      ZJH DEMO
    </h2>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.logo {
  display:flex;
  align-items:center;
  padding-left: 14px;
  height: 64px;
  overflow: hidden;
  white-space: nowrap;
  img {
    height: 50px;
  }
}

.title {
  font-size: 24px;
  // margin-bottom: 0
}
</style>