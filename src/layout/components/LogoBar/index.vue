<template>
  <div
    class="logo"
  >
    <img
      src="@/assets/JOE.png"
    >
    <span
      v-show="!collapsed"
      class="title"
    >
      JOE
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
  height: 64px;
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