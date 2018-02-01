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
						<li><span>本基金</span><span>{{rangeInfos[0]}}</span></li>
						<li><span>同类平均</span><span :class="{'color-red': parseFloat(rangeInfos[1])>0, 'color-green': parseFloat(rangeInfos[1])<0}">{{rangeInfos[1]}}</span></li>
						<li><span>同类排名</span><span>{{rangeInfos[2]}}</span></li>
					</ul>
				</div>
			</div>
			<div class="income-info">
				<table class="content-table">
					<tr>
						<td>时间</td>
						<td>区间回报</td>
						<td>同类平均</td>
						<td>同类排名</td>
					</tr>
					<tr>
						<td>近1月</td>
						<td v-for="(item, index) in rangeInfoList.rangeInfoOne" :key="index" :class="{'color-red': parseFloat(item)>0, 'color-green': parseFloat(item)<0}">{{item}}</td>
					</tr>
					<tr>
						<td>近3月</td>
						<td v-for="(item, index) in rangeInfoList.rangeInfoThree" :key="index" :class="{'color-red': parseFloat(item)>0, 'color-green': parseFloat(item)<0}">{{item}}</td>
					</tr>
					<tr>
						<td>近6月</td>
						<td v-for="(item, index) in rangeInfoList.rangeInfoSix" :key="index" :class="{'color-red': parseFloat(item)>0, 'color-green': parseFloat(item)<0}">{{item}}</td>
					</tr>
					<tr>
						<td>今年以来</td>
						<td v-for="(item, index) in rangeInfoList.rangeInfoThisYear" :key="index" :class="{'color-red': parseFloat(item)>0, 'color-green': parseFloat(item)<0}">{{item}}</td>
					</tr>
					<tr>
						<td>近3年</td>
						<td v-for="(item, index) in rangeInfoList.rangeInfoThreeYear" :key="index" :class="{'color-red': parseFloat(item)>0, 'color-green': parseFloat(item)<0}">{{item}}</td>
					</tr>
				</table>
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
				<tr v-for="(net, index) in netInfos" :key="index">
					<td>{{net.netDate}}</td>
					<td>{{net.unitNet}}</td>
					<td>{{net.totalNet}}</td>
					<td>{{net.rangeDay}}</td>
				</tr>
			</table>
			<a :href="`fundNetList.html?fundcode=${innerCode}`" class="show-more">点击查看更多</a>
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
						<div class="archives-num">
							最近规模：
							{{fundInfo[0]}}
						</div>
					</li>
					<li>
						<div class="archives-info">基金公司</div>
						<div class="archives-num">
							{{fundInfo[1]}}
						</div>
					</li>
					<li>
						<div class="archives-info">基金经理</div>
						<div class="archives-num">
							{{fundInfo[2]}}
						</div>
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
					<li v-for="(item, index) in notice" :key="index">
						<a :href="item.filePath">
							<div class="notice-info no-wrap">{{item.noticeTitle}}</div>
							<div class="notice-time">{{item.noticeDate}}</div>
						</a>
					</li>
				</ul>
				<a :href="`fundNoticeList.html?fundcode=${innerCode}`" class="show-more">点击查看更多</a>
			</div>
		</div>
	</div>
</template>

<script>
import {getData, getQueryString} from '@/common/js/api'
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
			innerCode: '',
			dateRange: 1,
			rangeInfoSum: null,
			rangeInfos: [],
			rangeInfoList: {
				rangeInfoOne: [],
				rangeInfoThree: [],
				rangeInfoSix: [],
				rangeInfoThisYear: [],
				rangeInfoThreeYear: []
			},
			netInfos: [],
			currentPage: 1,
			pageSize: 10,
			fundInfo: [],
			notice: []
		}
	},
	created(){
		this.changeUrl()
		this.getRangeData()
		this.getFundInfo()
		this.getNet()
		this.getAnnounce()
	},
	mounted(){
		myChart = echarts.init(document.getElementById('myChart'));
		this.drawLine()
	},
	methods: {
		// 获取url参数值
		changeUrl(){
			let innerCode = getQueryString('innerCode')
			if(innerCode){
				this.innerCode = innerCode
			}
		},
		// 图表曲线tab切换
		changeBg(index){
			this.navSelect = index
			this.dateRange = index + 1
			this.drawLine()
			let range, avg, order
			if(index === 0){
				this.rangeInfos.splice(0, this.rangeInfos.length)
				this.rangeInfos = this.rangeData(this.rangeInfoSum.rangeOneMonth, this.rangeInfoSum.avgOneMonth, this.rangeInfoSum.orderOneMonth)
			}else if(index === 1){
				this.rangeInfos.splice(0, this.rangeInfos.length)
				this.rangeInfos = this.rangeData(this.rangeInfoSum.rangeThreeMonth, this.rangeInfoSum.avgThreeMonth, this.rangeInfoSum.orderThreeMonth)
			}else if(index === 2){
				this.rangeInfos.splice(0, this.rangeInfos.length)
				this.rangeInfos = this.rangeData(this.rangeInfoSum.rangeSixMonth, this.rangeInfoSum.avgSixMonth, this.rangeInfoSum.orderSixMonth)
			}else if(index === 3){
				this.rangeInfos.splice(0, this.rangeInfos.length)
				this.rangeInfos = this.rangeData(this.rangeInfoSum.rangeThisYear, this.rangeInfoSum.avgThisYear, this.rangeInfoSum.orderThisYear)
			}else if(index === 4){
				this.rangeInfos.splice(0, this.rangeInfos.length)
				this.rangeInfos = this.rangeData(this.rangeInfoSum.rangeThreeYear, this.rangeInfoSum.avgThreeYear, this.rangeInfoSum.orderThreeYear)
				
			}
		},
		// 基金信息、公告tab切换
		changeInfoNav(index){
			this.infoNavSelect = index
			this.infoShow = index
		},
		// 获取累计收益栏目数据
		getRangeData(){
			getData(`fund/${this.innerCode}/net/range`, 'get').then((res)=>{
				console.log(res)
				this.rangeInfoSum = res

				this.rangeInfos.splice(0, this.rangeInfos.length)
				this.rangeInfos = this.rangeData(res.rangeOneMonth, res.avgOneMonth, res.orderOneMonth)

				this.rangeInfoList.rangeInfoOne = this.rangeDataNew(res.rangeOneMonth, res.avgOneMonth, res.orderOneMonth, res.orderOneMonthCount)
				this.rangeInfoList.rangeInfoThree = this.rangeDataNew(res.rangeThreeMonth, res.avgThreeMonth, res.orderThreeMonth, res.orderThreeMonthCount)
				this.rangeInfoList.rangeInfoSix = this.rangeDataNew(res.rangeSixMonth, res.avgSixMonth, res.orderSixMonth, res.orderSixMonthCount)
				this.rangeInfoList.rangeInfoThisYear = this.rangeDataNew(res.rangeThisYear, res.avgThisYear, res.orderThisYear, res.orderThisYearCount)
				this.rangeInfoList.rangeInfoThreeYear = this.rangeDataNew(res.rangeThreeYear, res.avgThreeYear, res.orderThreeYear, res.orderThreeYearCount)
			})
		},
		// 格式化区间报告、同类平均、同类排名
		rangeData(range, avg, order){
			let newRange = range ? `${range}%` : '-'
			let newAvg = avg ? avg>0 ? `+${avg}%` : `${avg}%` : '-'
			let newOrder = order ? `${order}` : '-'
			return [newRange, newAvg, newOrder]
		},
		rangeDataNew(range, avg, order, orderCount){
			let newRange = range ? range>0 ? `+${range}%` : `${range}%` : '-'
			let newAvg = avg ? avg>0 ? `+${avg}%` : `${avg}%` : '-'
			let newOrder = order ? `${order}/${orderCount}` : '-'
			return [newRange, newAvg, newOrder]
		},
		// 获取基金净值
		getNet(){
			let currentPage = this.currentPage
			let pageSize = this.pageSize
			let data = {
				currentPage,
				pageSize
			}
			getData(`fund/${this.innerCode}/history/net`, 'get', data).then((res) => {
				let l = res.list.length
				for(let i=0; i<l; i++){
					this.netInfos.push(res.list[i])
				}

			})
		},
		// 获取基金信息
		getFundInfo(){
			getData(`fund/${this.innerCode}/detail/info`, 'get').then((res) => {
				let netAsset = res.abbrNetAsset
				let fundManger = res.abbrFundManager
				let managerName = res.managerList[0].managerName
				this.fundInfo.push(netAsset, fundManger, managerName)
			})
		},
		// 获取基金公告
		getAnnounce(){
			getData(`fund/${this.innerCode}/notice/0/list/${this.currentPage}/${this.pageSize}`, 'get').then((res) => {
				for(let i=0; i<5; i++){
					this.notice.push(res.list[i])
				}
			})
		},
		// 生成图表
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
						margin: 30,
						// showMaxLabel: true,
						// showMinLabel: false,
						align: 'center'
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
                        fontSize: '14px',
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
				let netList = res.netList
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
					margin-right: 30px;
					&:nth-child(1){
						width: 185px;
					}
					&:nth-child(2){
						width: 245px;
					}
					&:last-child{
						width: 200px;
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
					}
					span{
						vertical-align: middle;
						display: inline-block;
						&:last-child{
							padding-left: 10px;
						}
					}
				}
			}
		}
	}
	.content-table{
		text-align: center;
		tr:nth-child(2n-1){
			background-color: $nav-bg-color;
		}
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
				a{
					display: block;
				}
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
