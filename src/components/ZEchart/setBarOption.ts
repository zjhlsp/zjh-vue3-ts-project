export const setBarOption = (value:any, data:any) => {
    const option:any = {
        title: {
            show: !!value?.title,
            text: value?.title || null
        },
        tooltip: {
            // trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            show: !value?.hideLegend,
            type: 'scroll',
            x: 'right',
            y: 'top',
            padding: [0, 0],
            itemGap: 20,
            itemWidth: 14,
            itemHeight: 14,
            icon: 'roundRect',
            pageIconSize: 10
        },
        grid: {
            left: '1%',
            right: '2%',
            bottom: '1%',
            containLabel: true
        },
        xAxis: {
            type: value?.reverse ? 'value' : 'category',
            boundaryGap: [0, 0.01],
            axisTick: { show: false },
            axisLabel: {
                // formatter  (value, index) {
                //     return value?.replace(' ', '\r\n')
                // },
                // interval: 0, // 使x轴横坐标全部显示
            },
            splitLine: {
                show: false
            },
            data:null
            // axisLabel: { // 设置x轴的字
            //     show: true,
            //     textStyle: {// x轴字体样式
            //         color: 'rgba(219,225,255,1)',
            //         margin: 15,
            //     },
            // },

        },
        yAxis: {
            type: value?.reverse ? 'category' : 'value',
            name: value?.yName,
            splitLine: {
                show: true
            },
            axisLabel: {
                interval: 0 // 使x轴横坐标全部显示
            },
            inverse: value?.inverse,
            data:null
        },
        // graphic: {
        //     type: 'text',
        //     left: 'center',
        //     top: '30%',
        //     silent: true,
        //     invisible: Object.keys(data).length !== 0, // 是否可见，这里的意思是当没有数据时可见
        //     style: {
        //         text: '暂无数据',
        //         fontSize: '16px',
        //     },
        // },
        series: []
    }
    if (value?.yData) { option.yAxis.data = value?.yData }
    if (value?.xData) { option.xAxis.data = value?.xData }
    const seriesNameList = Object.keys(data)
    option.series = []
    if (seriesNameList.length) {
        option.legend.data = seriesNameList
        seriesNameList.map(name => {
            option.series.push({
                name: name,
                type: 'bar',
                barGap: 0,
                color: value?.color,
                realtimeSort: value?.realtimeSort,
                barMinWidth: 8,
                barMaxWidth: 16,
                data: data[name],
                // 高亮时聚焦该条，淡出其他数据
                emphasis: {
                    focus: 'self',
                    blurScope: 'global'
                },
                // 取消悬浮高亮行为
                legendHoverLink: false,
                // hoverAnimation: false,

                // 最小高度中写自定义函数
                barMinHeight: (function () {
                    // 判断数据是否为0
                    if (data[name].value === 0) {
                        // 是0则不设置高度，否则设置最小高度5
                        return 0
                    } else {
                        return 5
                    }
                })()
            })
        })
    }
    return option
}
