<script setup lang="ts">

import DefaultPropsVue from 'com/DefaultProps.vue';
const handleClick = (value:string) => {
    alert(value)
}
</script>

<template>
<default-props-vue
msg='this is vue3.2'
:ageList="[11, 22, 33]"
@parentClick="handleClick"></default-props-vue>
</template>