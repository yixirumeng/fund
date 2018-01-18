<template>
	<div class="income">
		<h2>累计收益</h2>
		<div class="income-chart">
			<ul class="chart-nav clearfix">
				<li v-for="(nav, index) in navs" :key="index" :class="{on: navSelect==index}" @click="changeBg(index)">
					{{nav}}
				</li>
			</ul>
			<div :style="{position:'relative',width: '100%',height: '250px'}">
				<div id="myChart" :style="{width: '100%',height: '300px', position: 'absolute', top: '-40px',left: '0', zIndex:'1'}"></div>
			</div>
			<div class="income-change">
				<ul class="clearfix">
					<li>本基金<span>0.17%</span></li>
					<li>同类平均<span>0.21%</span></li>
					<li>同类排名<span>4/50</span></li>
				</ul>
			</div>
			<div class="income-info">
				<table>
					<tr>
						<td width="25%">时间</td>
						<td width="25%">区间回报</td>
						<td width="25%">同类平均</td>
						<td width="25%">沪深300</td>
					</tr>
					<tr>
						<td>近1月</td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>近3月</td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>近6月</td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>今年以来</td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>近3年</td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</table>
			</div>
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
			dateRange: 1
		}
	},
	created(){
		this.incomeRange()
	},
	mounted(){
		myChart = echarts.init(document.getElementById('myChart'));
		this.drawLine()
	},
	methods: {
		changeBg(index){
			this.navSelect = index
			this.dateRange = index + 1
			this.drawLine()
		},
		drawLine(){
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
                    left: 60,
                    right: 20
                },
                xAxis: {
                    type : 'category',
					boundaryGap : false,
					minInterval: 0,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#666',
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
                    data: []
                },
                yAxis: {
                    min: 'dataMin',
                    axisLabel: {
                        show: true,
                        color: '#666',
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
                            color: '#5b80fe'
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
                    data: []
                }]
			})
			getData(`${this.innerCode}/${this.dateRange}/totalnet/list`, 'get').then((res)=>{
				if(res.code === 0){
					let netList = res.content.netList
					let l = netList.length
					let xData = []
					let yData = []
					for(let i=0; i<l; i++){
						xData.push(netList[i].netDate)
						yData.push(netList[i].totalNet)
					}
					myChart.setOption({
						xAxis: {
							data: xData
						},
						series: [{
							data: yData
						}]
					})
				}
			})
		},
		incomeRange(){
			getData(`${this.innerCode}/net/range`, 'get').then((res)=>{
				console.log(res)
			})
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
		position: relative;
		.chart-nav{
			position: relative;
			z-index: 2;
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
		.income-change{
			padding: 0 30px;
			font-size: 26px;
			position: relative;
			ul{
				li{
					float: left;
					text-align: center;
					margin-right: 48px;
					&:last-child{
						margin-right: 0;
					}
					&:before{
						content: "";
						display: inline-block;
						width: 8px;
						height: 8px;
						border-radius: 4px;
						background: $font-color-r;
						vertical-align: middle;
						margin-right: 10px;
						margin-top: -5px;
					}
					span{
						padding-left: 10px;
					}
				}
			}
		}
		.income-info{
			margin-top: 35px;
			table{
				width: 100%;
				text-align: center;
				tr{
					height: 70px;
					line-height: 70px;
					font-size: $font-size-n;
					&:first-child{
						background-color: $nav-bg-color;
						font-size: $font-size-l;
					}
				}
			}
		}
	}
}
</style>
