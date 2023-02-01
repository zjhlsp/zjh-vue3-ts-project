export const setPieOption = (
    optionData:any,
    seriesData:any) => {
    const option:any = {
        grid: {
            left: '1%',
            right: '2%',
            bottom: '1%',
            containLabel: true
        },
        title: {
            show: !!optionData?.title,
            text: optionData?.title || null
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            show: true,
            type: 'scroll',
            origin: 'vertical',
            orient: 'vertical',
            x: optionData?.legendX || 'right',
            y: optionData?.legendY || 'top',
            itemWidth: 14,
            itemHeight: 14,
            icon: 'roundRect',
            data: seriesData.legendData,
            pageIconSize: 10
        },
        series: [
            {
                startAngle: 180,
                minAngle: 5, // 最小值
                legendHoverLink: false, // 取消图例悬浮高亮事件
                name: seriesData?.seriesName || '暂无数据',
                type: 'pie',
                radius: ['52%', '82%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                itemStyle: {
                    borderWidth: 0
                },
                labelLine: {
                    show: false
                },
                data: seriesData.seriesData,
                emphasis: {
                    label: {
                        formatter: [
                            '{c|{c}}',
                            '{b|{b}}'
                        ].join('\n'),
                        show: true,
                        fontSize: '24px',
                        color: () => {
                        },
                        rich: {
                            b: {
                                color: 'black',
                                fontSize: '24px',
                                lineHeight: 30
                            },
                            c: {
                                fontSize: '32px',
                                lineHeight: 50,
                                fontWeight: 'bold'
                            }
                        }
                    }

                }
            }
        ]
    }
    // 当没有数据的时候隐藏 label 设置边框以及白色填充色
    if (seriesData.seriesData && seriesData.seriesData[0].name === '暂无数据') {
        option.legend['show'] = false
        option.series[0].itemStyle.borderWidth = 1
    } else {
        option.legend['show'] = true
    }

    return option
}
