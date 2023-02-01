<template>
  <div
    class="chart"
  >
    <div
      ref="chart"
      :style="{ height: props.height, width: props.width }"
    />
  </div>
</template>
<script setup lang='ts'>
import * as echarts from 'echarts'
import { setBarOption } from '../ZEchart/setBarOption'
import { setPieOption } from '../ZEchart/setPieOption'
import { markRaw, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
    // 高
    height: {
    type: String,
    required: false,
    default: '100%'
    },
    // 宽
    width: {
    type: String,
    required: false,
    default: '100%'
    },
    // 图标样式选项
    option: {
        type: Object,
        require: true,
        default: () => {}
    },
    // 图标数据
    data: {
        type: Object,
        required: true
    },
    // 图表类型
    type: {
        type: String,
        default: 'Bar'
    }
})

const chart = ref()
const myChart = ref()
onMounted(() => {
    initChart()
})

onUnmounted(() => {
    if (!myChart.value) {
            return
        }
    // 销毁实例
    myChart.value.dispose()
    myChart.value = null
    window.removeEventListener('resize', () => {
        myChart.value.resize()
    })
})

const initChart = ():void => {
    myChart.value = markRaw(echarts.init(chart.value))
    // 监听窗口大小，自适应
    window.addEventListener('resize', () => {
        myChart.value.resize()
    })
    setOptions()
}

const setOptions = ():void => {
    if (!myChart.value) {
        return
    }
    switch (props.type) {
        case 'Bar':
        myChart.value.setOption(setBarOption(props.option, props.data))
        break
        case 'Pie':
        myChart.value.setOption(setPieOption(props.option, props.data))
                                // 默认高亮
                                let index = 0 // 高亮索引
                        // 是否被点击筛选
                        let isSelect = false
                        let pieIndex = -1 // 点击的高亮
                        myChart.value.dispatchAction({
                            type: 'highlight',
                            seriesIndex: index,
                            dataIndex: index
                        })
                        myChart.value.on('mouseover', (e: { dataIndex: any; }) => {
                            if (isSelect) {
                                myChart.value.dispatchAction({
                                    type: 'downplay',
                                    seriesIndex: 0,
                                    dataIndex: pieIndex
                                })
                            } else {
                                myChart.value.dispatchAction({
                                    type: 'downplay',
                                    seriesIndex: 0,
                                    dataIndex: index
                                })
                            }

                            myChart.value.dispatchAction({
                                type: 'highlight',
                                seriesIndex: 0,
                                dataIndex: e.dataIndex
                            })
                        })
                        myChart.value.on('mouseout', (e: { dataIndex: number; }) => {
                            index = e.dataIndex
                            if (isSelect) {
                                myChart.value.dispatchAction({
                                    type: 'downplay',
                                    seriesIndex: 0,
                                    dataIndex: index
                                })
                                myChart.value.dispatchAction({
                                    type: 'highlight',
                                    seriesIndex: 0,
                                    dataIndex: pieIndex
                                })
                            } else {
                                myChart.value.dispatchAction({
                                    type: 'highlight',
                                    seriesIndex: 0,
                                    dataIndex: e.dataIndex
                                })
                            }
                        })
                        // 点击时高亮当前数据
                        myChart.value.on('click', (e: { dataIndex: number; }) => {
                            index = e.dataIndex
                            isSelect = true
                            pieIndex = e.dataIndex
                            myChart.value.dispatchAction({
                                type: 'highlight',
                                seriesIndex: 0,
                                dataIndex: e.dataIndex
                            })
                        })
        break
    }
}

watch(
    [() => props.option, () => props.data],
    (value) => {
        if (value) {
            refresh()
        }
    }
)

const refresh = ():void => {
    myChart.value && myChart.value.clear()
    // 销毁实例再重新创建，防止setoption数据残留
    myChart.value.dispose()
    initChart()
    myChart.value.resize()
}
</script>
<style lang='scss'>
</style>