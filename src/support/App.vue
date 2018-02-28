<template>
	<div>
		<div class="support-nav">
			<ul class="clearfix">
				<li v-for="(nav, index) in navs" :key="index" @click="changeNav(index)">
					<span :class="{'nav-on': nowIndex==index}">{{nav}}</span>
				</li>
			</ul>
		</div>
		<div v-show="detail===0">
			<div class="content-sum">
				<h2 class="title clearfix">
					<span>重度持仓</span><span>{{supportYear}}年第{{supportQuarter}}季度</span>
				</h2>
				<table class="content-table">
					<tr>
						<td>股票名称</td>
						<td>持仓占比</td>
					</tr>
					<tr v-for="(item, index) in heavyStocks" :key="index">
						<td>
							<p>{{item.chiNameAbbr}}</p>
							<p class="support-code">{{item.secuCode}}</p>
						</td>
						<td>
							<p>{{item.ratioInNV}}%</p>
						</td>
					</tr>
				</table>
			</div>
			<div class="content-sum">
				<h2 class="title clearfix">
					<span>持仓债券</span><span>{{supportYear}}年第{{supportQuarter}}季度</span>
				</h2>
				<table class="content-table">
					<tr>
						<td>股票名称</td>
						<td>持仓占比</td>
					</tr>
					<tr v-for="(item, index) in heavyBond" :key="index">
						<td>
							<p>{{item.secuAbbr}}</p>
							<p class="support-code">{{item.secuCode}}</p>
						</td>
						<td>
							<p>{{item.ratioInNV}}%</p>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div v-show="detail===1">
			<div class="content-sum">
				<h2 class="title title1 clearfix">
					<span>配置详情</span><span>{{supportYear}}年第{{supportQuarter}}季度</span>
				</h2>
				<div class="content">
					<table class="content-table content-table1">
						<tr>
							<td>行业类别</td>
							<td>市值(万元)</td>
							<td>占净值比</td>
						</tr>
						<tr v-for="(item, index) in industryAllocation" :key="index">
							<td>
								<div>{{item.industryName}}</div>
							</td>
							<td>
								{{item.marketValue}}
							</td>
							<td>
								{{item.ratioInNV}}%
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div v-show="detail===2">
			<div class="content-sum">
				<h2 class="title title1 clearfix">
					<span>配置详情</span><span>{{supportYear}}年第{{supportQuarter}}季度</span>
				</h2>
				<div class="content">
					<table class="content-table">
						<tr>
							<td>项目</td>
							<td>数据</td>
						</tr>
						<tr v-for="(item, index) in assetAllocation" :key="index">
							<td>
								{{assetTypeFormat(item.assetType)}}
							</td>
							<td>
								{{item.netValueRation}}%
							</td>
						</tr>
					</table>
					<div class="content-tip">
						<p>占净值比例：基金占净资产比例。</p>
						<p>友情提示：如果出现各资产总和占净值比例超过100%的现象，一般是由于基金在运作过程中存在负债，如存在应付款或债券质押杠杆交易等情况。</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {getData, getQueryString} from '@/common/js/api'

export default {
	data(){
		return {
			navs: ['持仓明细', '行业配置', '资产配置'],
			nowIndex: 0,
			detail: 0,
			innerCode: '',
			supportYear: '',
			supportQuarter: '',
			quarter: '',
			heavyStocks: '',
			heavyBond: '',
			industryAllocation: '',
			assetAllocation: ''
		}
	},
	created(){
		this.getSupportDate()
		this.getFundCode()
		this.getHeavyStocks()
		this.getHeavyBond()
		this.getIndustryAllocation()
		this.getAssetAllocation()
	},
	methods:{
		// 导航切换
		changeNav(index){
			this.nowIndex = index
			this.detail = index
		},
		// 获取年份季度
		getSupportDate(){
			let date = new Date()
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			if(month>=1 && month<=3){
				this.supportYear = year - 1
				this.supportQuarter = '四'
				this.quarter = '4'
				return false
			}else if(month>=4 && month<=6){
				this.supportQuarter = '一'
				this.quarter = '1'
			}else if(month>=7 && month<= 9){
				this.supportQuarter = '二'
				this.quarter = '2'
			}else if(month>=10 && month<= 12){
				this.supportQuarter = '三'
				this.quarter = '3'
			}
			this.supportYear = year
		},
		// 获取基金代码
		getFundCode(){
			let innerCode = getQueryString('innerCode')
			if(innerCode){
				this.innerCode = innerCode
			}
		},
		// 请求参数格式化
		paramsFormat(){
			let year = this.supportYear
			let quarter = this.quarter
			let data = {
				year,
				quarter
			}
			return data
		},
		// 获取重仓持股信息
		getHeavyStocks(){
			getData(`fund/investment/${this.innerCode}/heavyStocks`, 'get', this.paramsFormat()).then((res) => {
				this.heavyStocks = res
			})
		},
		// 获取持仓债券信息
		getHeavyBond(){
			getData(`fund/investment/${this.innerCode}/heavyBond`, 'get', this.paramsFormat()).then((res) => {
				this.heavyBond = res
			})
		},
		// 获取行业配置信息
		getIndustryAllocation(){
			getData(`fund/investment/${this.innerCode}/industryAllocation`, 'get', this.paramsFormat()).then((res) => {
				this.industryAllocation = res
			})
		},
		// 获取资产配置信息
		getAssetAllocation(){
			getData(`fund/investment/${this.innerCode}/assetAllocation`, 'get', this.paramsFormat()).then((res) => {
				this.assetAllocation = res
			})
		},
		// 资产配置项目名称格式化
		assetTypeFormat(assetType){
			let typeContain = assetType.indexOf('其他')
			if(typeContain<0){
				return `${assetType}占净比`
			}else{
				return assetType
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.support-nav{
	font-size: $font-size-ll;
	color: $font-color-d;
	background: $color-white;
	padding: 0 30px;
	ul{
		li{
			float: left;
			width: 33.3%;
			
			&:nth-child(2){
				text-align: center;
			}
			&:last-child{
				text-align: right;
			}
			span{
				display: inline-block;
				padding: 28px 0 22px;
			}
		}
	}
}

.content-sum{
	margin-top: 15px;
	.title{
		span{
			padding: 0 30px;
			display: inline-block;
			&:first-child{
				float: left;
			}
			&:last-child{
				float: right;
				margin-top: 4px;
				font-size: $font-size-n;
				color: $font-color-n;
			}
		}
	}
	.title1{
		border-bottom: 1px solid $border-color;
	}
	.content{
		margin: 0 30px;
	}
	.content-table{
		border: 1px solid $border-color;
		margin-top: 26px;
		tr{
			border: 1px solid $border-color;
			td {
				padding-left: 30px;
				p{
					color: $font-color-d;
					&.support-code{
						margin-top: 20px;
						color: $font-color-n;
					}
				}
			}
		}
	}
	.content-table1{
		tr{
			td{
				&:nth-child(1){
					width: 46%;
				}
				&:nth-child(2){
					width: 28%;
				}
				&:nth-child(3){
					width: 26%;
				}
				div{
					line-height: 1.4;
				}
			}
		}
	}
	.content-tip{
		margin-top: 24px;
		color: $font-color-s;
		font-size: $font-size-n;
		p{
			line-height: 1.5;
			letter-spacing: 2px;
		}
	}
}
</style>

