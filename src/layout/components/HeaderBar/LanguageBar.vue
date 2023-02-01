<template>
  <div>
    <img
      src="@/assets/lang.png"
      @click="handleChangeLang"
    >
  </div>
</template>
<script setup lang='ts'>
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const i18n = useI18n()

const currentLang = ref(localStorage.getItem('Lang') || 'chs')

const handleChangeLang = ():void => {
    i18n.locale.value = currentLang.value === 'chs' ? 'en' : 'chs'
    currentLang.value = i18n.locale.value
    localStorage.setItem('Lang', currentLang.value)
}
</script>
<style lang='scss' scoped>
img {
    height: 20px;
    width: 20px;
    cursor: pointer;
}
</style>