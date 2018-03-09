<template>
    <div>
        <div id="parts" :style="{width: width, height: height + 'px', position: 'absolute', top: '-40px'}"></div>
    </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

var myChart;

export default {
    name: 'parts',
    props: {
        width: '',
        height: '',
        xData: {
            type: Array
        },
        yData: {
            type: Array
        }
    },
    data () {
        return {
            myChart: ''
        }
    },
    watch: {
        xData (a, b) {
            this.draw()
        },
        yData (a, b) {
            this.draw()
        }
    },
    mounted () {
        myChart = echarts.init(document.getElementById('parts'));
        this.draw()
        window.onresize = () => {
            this.draw()
        }
    },
    methods: {
        draw () {
            let that = this;
            myChart.dispose();
            myChart = echarts.init(document.getElementById('parts'));
            myChart.setOption({
                tooltip : {
                    trigger: 'axis',
                },
                grid: {
                    left: 60,
                    right: 30,
                    bottom: 50
                },
                xAxis: {
                    type : 'category',
                    boundaryGap : false,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#666',
                            fontSize: '12px',
                            fontFamily: 'Arial'
                        },
                        margin: 14
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#c4c4d2'
                        }
                    },
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false
                    },
                    data: that.xData
                },
                yAxis: {
                    min: 'dataMin',
                    axisLabel: {
                        show: true,
                        color: '#666',
                        fontSize: '14px',
                        fontFamily: 'Arial',
                        margin: 10,
                        formatter: function(value){
                            return parseFloat(value).toFixed(4)
                        }
                    },
                    axisLine: {
                        show: false
                        // lineStyle: {
                        //     color: '#ddd'
                        // }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#eeeff1'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                },
                series: [{
                    name: '',
                    type: 'line',
                    smooth: true,
                    symbolSize: 4,
                    itemStyle: {
                        normal: {
                            color: '#5b80fe',
                            lineStyle: {
                                color: '#5b80fe',
                                width: 1
                            }
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#dee2ff'
                            }, {
                                offset: 1,
                                color: '#fcfcfc'
                            }])
                        }
                    },
                    data: that.yData
                }]
            });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
