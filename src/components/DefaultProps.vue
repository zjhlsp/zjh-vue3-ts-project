<script lang="ts" setup>

const props = withDefaults(defineProps<{
    msg: string,
    ageList: Array<number>,
}>(),{
    msg: 'heallo',
    ageList: () => [1, 2, 3]
})

const emit = defineEmits(['parentClick'])

const emitClick = (value:number) => {
    emit('parentClick', `this is ${value}`)
}
</script>

<template>
<h1>{{msg}}</h1>
<button @click='emitClick(1)'>子传父</button>
</template>