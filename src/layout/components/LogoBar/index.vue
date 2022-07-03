<template>
  <div
    class="logo"
    :style="collapsed ? 'width: 64px' : ''"
  >
    <img
      src="@/assets/JOE.png"
    >
    <h2
      v-show="!collapsed"
      class="title"
    >
      JOE
    </h2>
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
  width: auto;
  height: 64px;
  overflow: hidden;
  white-space: nowrap;
  img {
    height: 64px;
    width: 64px;
  }
}

.title {
  background-color: $menuBg;
  display: flex;
  color: #fff;
  width: 100%;
  height: 100%;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  // width: 200px
}
</style>