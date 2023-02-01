<template>
  <div
    class="logo"
  >
    <img
      style="height: 60px; width: 60px"
      src="@/assets/logo.jpg"
    >
    <span
      v-show="!collapsed"
      class="title"
    >
      山野食堂
    </span>
  </div>
</template>

<script setup lang="ts">

defineProps({
    collapsed: {
    type: Boolean
    }
})

</script>

<style lang="scss" scoped>
.logo {
  display:flex;
  align-items:center;
  overflow: hidden;
  white-space: nowrap;
  background-color: $lightGray;
  img {
    height: 64px;
    width: 64px;
  }
  .title {
  // background-color: $menuBg;
  display: flex;
  color: black;
  width: 100%;
  height: 100%;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  // width: 200px
}
}


</style>