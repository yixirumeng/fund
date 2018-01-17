<template>
	<div class="income">
		<h2>累计收益</h2>
		<div class="income-chart">
			<ul class="chart-nav clearfix">
				<li v-for="(nav, index) in navs" :key="index" :class="{on: navSelect==index}" @click="changeBg(index)">
					{{nav}}
				</li>
			</ul>
			<div id="myChart" :style="{width: '100%',height: '320px'}"></div>
		</div>
	</div>
</template>

<script>
import {getData} from '@/common/js/api'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

var myChart

export default {
	name: 'App',
	data(){
		return {
			navs: ['近1月', '近3月', '近6月', '今年以来', '近3年'],
			navSelect: 0,
			innerCode: 57835,
			dateRange: 1,
			xData: [],
			yData: []
		}
	},
	created(){
		this._getData()
	},
	mounted(){
		myChart = echarts.init(document.getElementById('myChart'));
		this.drawLine()
	},
	methods: {
		changeBg(index){
			this.navSelect = index
		},
		_getData(){
			this.xData1 = []
			getData(`${this.innerCode}/${this.dateRange}/totalnet/list`, 'get').then((res)=>{
				console.log(res.content.netList)
				if(res.code === 0){
					let netList = res.content.netList
					let l = netList.length
					for(let i=0; i<l; i++){
						this.xData.push(netList[i].netDate)
						this.yData.push(netList[i].totalNet)
					}
					console.log(this.xData.length)
				}
			})
		},
		drawLine(){
			console.log(this.xData)
			let that = this;
			if (myChart != null && myChart != "" && myChart != undefined) {
				myChart.dispose();
			}
			myChart = echarts.init(document.getElementById('myChart'));
            myChart.setOption({
                tooltip : {
                    trigger: 'axis'
                },
                grid: {
                    left: 50,
                    right: 30
                },
                xAxis: {
                    type : 'category',
					boundaryGap : false,
					minInterval: 0,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#999',
                            fontSize: '12px',
                            fontFamily: 'Arial'
						},
						verticalAlign: 'bottom',
                    	margin: 30
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ddd'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#eee'
                        }
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
                        color: '#ff3333',
                        fontSize: '12px',
                        fontFamily: 'Arial',
                        margin: 10,
                        formatter: function(value){
                            return parseFloat(value).toFixed(4)
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#eee',
                            type: 'dashed'
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
                            color: '#ff6868'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#fdb4b4'
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
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.income{
	h2{
		color: $font-color-d;
		font-size: $font-size-ll;
		font-weight: bold;
		padding: 25px 0 25px 22px;
	}
	.income-chart{
		.chart-nav{
			li{
				float: left;
				width: 20%;
				height: 70px;
				line-height: 70px;
				text-align: center;
				font-size: $font-size-l;
				border-top: 1px solid $border-color;
				background: $nav-bg-color;
			}
			.on{
				background: $color-white;
			}
		}
	}
}
</style>
