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
				<div :style="{position: 'relative', height: '260px', width: '96%', margin: '0 auto'}">
					<echarts-parts :width="'100%'" height="300" :x-data="xData" :y-data="yData"></echarts-parts>
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
			<div class="show-more" @click="callFundNet">点击查看更多</div>
		</div>
		<div class="content content-separate">
			<div class="info-nav">
				<ul class="clearfix">
					<li v-for="(infoNav, index) in infoNavs" :key="index" :class="{'nav-on': infoNavSelect===index}" @click="changeInfoNav(index)">{{infoNav}}</li>
				</ul>
			</div>
			<div class="details-info" v-show="infoShow===0">
				<ul>
					<li @click="callInfo">
						<div class="archives-info">基金信息</div>
						<div class="archives-num">
							最近规模：
							{{fundInfo[0]}}
						</div>
					</li>
					<li @click="callCompany">
						<div class="archives-info">基金公司</div>
						<div class="archives-num">
							{{fundInfo[1]}}
						</div>
					</li>
					<li>
						<div class="archives-info">
							基金经理
						</div>
						<div class="archives-manager">
							<span v-for="(item, index) in managerName" :key="index" @click="callManager(item.personalCode)">
								{{item.managerName}}
							</span>
						</div>
					</li>
					<li @click="callBonus">
						<div class="archives-info">分红信息</div>
						<div class="archives-num"></div>
					</li>
					<li @click="callSupport">
						<div class="archives-info">基金持仓</div>
						<div class="archives-num"></div>
					</li>
				</ul>
			</div>
			<div class="details-info" v-show="infoShow===1">
				<ul>
					<li v-for="(item, index) in notice" :key="index">
						<div @click="sendUrl(item.filePath)">
							<div class="notice-info no-wrap">{{item.noticeTitle}}</div>
							<div class="notice-time">{{item.noticeDate}}</div>
						</div>
					</li>
				</ul>
				<div class="show-more" @click="callFundNotice">点击查看更多</div>
			</div>
		</div>
	</div>
</template>

<script>
import {getData, getQueryString, callAppType, depositPath} from '@/common/js/api'
import echartsParts from '@/detail/echarts-parts'

export default {
	name: 'App',
	data(){
		return {
			navs: ['近1月', '近3月', '近6月', '今年以来', '成立以来'],
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
			notice: [],
			xData: [],
			yData: [],
			managerName: null
		}
	},
	created(){
		this.changeUrl()
		this.getEchartsData()
		this.getRangeData()
		this.getFundInfo()
		this.getNet()
		this.getAnnounce()
		
	},
	components: {
		echartsParts
	},
	methods: {
		// 获取url参数值
		changeUrl(){
			let innerCode = getQueryString('innerCode')
			if(innerCode){
				this.innerCode = innerCode
			}
		},
		// 获取echarts数据
		getEchartsData(){
			getData(`fund/${this.innerCode}/${this.dateRange}/totalnet/list`, 'get').then((res)=>{
				this.xData = []
				this.yData = []
				let l = res.netList.length
				for(let i=0; i<l; i++){
					this.xData.push(res.netList[i].netDate)
					this.yData.push(res.netList[i].totalNet)
				}
			})
		},
		// 图表曲线tab切换
		changeBg(index){
			this.navSelect = index
			this.dateRange = index + 1
			this.getEchartsData()
			let range, avg, order
			this.rangeInfos.splice(0, this.rangeInfos.length)
			if(index === 0){
				this.rangeInfos = this.rangeData(this.rangeInfoSum.rangeOneMonth, this.rangeInfoSum.avgOneMonth, this.rangeInfoSum.orderOneMonth)
			}else if(index === 1){
				this.rangeInfos = this.rangeData(this.rangeInfoSum.rangeThreeMonth, this.rangeInfoSum.avgThreeMonth, this.rangeInfoSum.orderThreeMonth)
			}else if(index === 2){
				this.rangeInfos = this.rangeData(this.rangeInfoSum.rangeSixMonth, this.rangeInfoSum.avgSixMonth, this.rangeInfoSum.orderSixMonth)
			}else if(index === 3){
				this.rangeInfos = this.rangeData(this.rangeInfoSum.rangeThisYear, this.rangeInfoSum.avgThisYear, this.rangeInfoSum.orderThisYear)
			}else if(index === 4){
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
				this.fundInfo.push(netAsset, fundManger)
				this.managerName = res.managerList
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
		// 基金净值点击更多跳转
		callFundNet(){
			callAppType('1', `${depositPath}fundNetList.html?innerCode=${this.innerCode}`, '基金净值')
		},
		// 基金公告点击更多跳转
		callFundNotice(){
			callAppType('1', `${depositPath}fundNoticeList.html?innerCode=${this.innerCode}`, '基金公告')
		},
		// 基金分红点击跳转
		callBonus(){
			callAppType('1', `${depositPath}bonus.html?innerCode=${this.innerCode}`, '分红信息')
		},
		// 基金持仓点击跳转
		callSupport(){
			callAppType('1', `${depositPath}support.html?innerCode=${this.innerCode}`, '基金持仓')
		},
		// 基金公告点击发送url
		sendUrl(noticeUrl){
			callAppType('21', noticeUrl, '基金公告')
		},
		// 基金信息点击跳转
		callInfo(){
			callAppType('12', `${this.innerCode}`, '基金信息')
		},
		// 基金公司点击跳转
		callCompany(){
			callAppType('13', `${this.innerCode}`, '基金公司')
		},
		// 基金经理点击跳转
		callManager(personalCode){
			callAppType('14', `${personalCode}`, '基金经理')
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
					margin-right: 10px;
					&:nth-child(1){
						width: 220px;
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
				.archives-manager{
					float: right;
					color: $font-color-d;
					margin-right: 24px;
					span{
						color: #1998CF;
						margin-left: 16px;
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
