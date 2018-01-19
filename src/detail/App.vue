<template>
	<div>
		<div class="content">
			<h2 class="title">累计收益</h2>
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
			</div>
			<div class="income-info">
				<table class="content-table">
					<tr>
						<td>时间</td>
						<td>区间回报</td>
						<td>同类平均</td>
						<td>沪深300</td>
					</tr>
					<tr>
						<td>近1月</td>
						<td class="rise">+0.46%</td>
						<td class="decline">+0.46%</td>
						<td class="rise">+0.46%</td>
					</tr>
					<tr>
						<td>近3月</td>
						<td class="rise">+0.46%</td>
						<td class="decline">+0.46%</td>
						<td class="rise">+0.46%</td>
					</tr>
					<tr>
						<td>近6月</td>
						<td class="rise">+0.46%</td>
						<td class="decline">+0.46%</td>
						<td class="rise">+0.46%</td>
					</tr>
					<tr>
						<td>今年以来</td>
						<td class="rise">+0.46%</td>
						<td class="decline">+0.46%</td>
						<td class="rise">+0.46%</td>
					</tr>
					<tr>
						<td>近3年</td>
						<td class="rise">+0.46%</td>
						<td class="decline">+0.46%</td>
						<td class="rise">+0.46%</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="content content-separate">
			<div class="info-nav">
				<ul class="clearfix">
					<li v-for="(infoNav, index) in infoNavs" :key="index" :class="{'nav-on': infoNavSelect===index}" @click="changeInfoNav(index)">{{infoNav}}</li>
				</ul>
			</div>
			<div class="details-info" v-show="infoShow===0">
				<ul>
					<li>
						<div class="archives-info">基金信息</div>
						<div class="archives-num">最近规模：2.92亿</div>
					</li>
					<li>
						<div class="archives-info">基金公司</div>
						<div class="archives-num">前海开源</div>
					</li>
					<li>
						<div class="archives-info">基金经理</div>
						<div class="archives-num">徐丽萍</div>
					</li>
					<li>
						<div class="archives-info">分红信息</div>
						<div class="archives-num"></div>
					</li>
					<li>
						<div class="archives-info">基金持仓</div>
						<div class="archives-num"></div>
					</li>
				</ul>
			</div>
			<div class="details-info" v-show="infoShow===1">
				<ul>
					<li>
						<div class="notice-info no-wrap">工银瑞信金融地产，工银音信基金管理有限音信基金管理有限</div>
						<div class="notice-time">2017.12.23</div>
					</li>
					<li>
						<div class="notice-info no-wrap">工银瑞信金融地产，工银音信基金管理有限音信基金管理有限</div>
						<div class="notice-time">2017.12.23</div>
					</li>
					<li>
						<div class="notice-info no-wrap">工银瑞信金融地产，工银音信基金管理有限音信基金管理有限</div>
						<div class="notice-time">2017.12.23</div>
					</li>
					<li>
						<div class="notice-info no-wrap">工银瑞信金融地产，工银音信基金管理有限音信基金管理有限</div>
						<div class="notice-time">2017.12.23</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="content content-bottom">
			<h2 class="title">基金净值</h2>
			<table class="content-table">
				<tr>
					<td>日期</td>
					<td>单位净值</td>
					<td>累计净值</td>
					<td>日涨幅</td>
				</tr>
			</table>
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
			infoNavs: ['基金档案', '基金公告'],
			navSelect: 0,
			infoNavSelect: 0,
			infoShow: 0,
			innerCode: 57835,
			dateRange: 1
		}
	},
	created(){
		// this.incomeRange()
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
		changeInfoNav(index){
			this.infoNavSelect = index
			this.infoShow = index
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
			getData(`fund/${this.innerCode}/${this.dateRange}/totalnet/list`, 'get').then((res)=>{
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
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
@import '../common/styles/mixin.scss';
.content{
	background: $color-white;
	margin: 0;
	font-size: $font-size-n;
	.title{
		padding-left: 30px;
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
	}
	.content-table{
		text-align: center;
	}
	.rise{
		color: $font-color-r;
	}
	.decline{
		color: $font-color-g;
	}
	.income-info{
		margin-top: 35px;
	}
	.info-nav{
		font-size: $font-size-ll;
		ul{
			li{
				float: left;
				padding: 24px 0;
				margin-right: 50px;
			}
		}
	}
	.details-info{
		margin-top: 15px;
		ul{
			li{
				padding: 20px 0;
				border-bottom: 1px solid $border-color;
				&:after{
					content: "";
					display: block;
					clear: both;
				}
				.archives-info{
					float: left;
				}
				.archives-num{
					float: right;
					color: $font-color-d;
					&:after{
						content: "";
						display: inline-block;
						vertical-align: middle;
						margin-left: 20px;
						width: 11px;
						height: 19px;
						@include bg-image('../common/images/arrow');
						background-repeat: no-repeat;
					}
				}
				.notice-info{
					font-size: $font-size-title;
					color: $font-color-d;
				}
				.notice-time{
					color: $font-color-s;
					margin-top: 20px;
				}
			}
		}
	}
}

.content-separate{
	margin-top: 15px;
	padding: 0 30px;
}

.content-bottom{
	margin-top: 15px;
	padding: 0;
}
</style>
