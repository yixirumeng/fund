<template>
	<div>
		<div class="content-sum">
			<div class="content">
				<h2 class="title">认购</h2>
				<table class="content-table">
					<tr>
						<td>认购金额（M）</td>
						<td>费率</td>
					</tr>
					<tr v-for="(item, index) in affirmRate" :key="index">
						<td>{{item.range}}</td>
						<td>{{item.rate}}</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="content-sum">
			<div class="content">
				<h2 class="title">买入</h2>
				<table class="content-table">
					<tr>
						<td>认购金额（M）</td>
						<td>费率</td>
					</tr>
					<tr v-for="(item, index) in applyRate" :key="index">
						<td>{{item.range}}</td>
						<td>{{item.rate}}</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="content-sum">
			<div class="content">
				<h2 class="title">卖出</h2>
				<table class="content-table">
					<tr>
						<td>持有期限(T)</td>
						<td>费率</td>
					</tr>
					<tr v-for="(item, index) in redemptionRate" :key="index">
						<td>{{item.range}}</td>
						<td>{{item.rate}}</td>
					</tr>
				</table>
				<div class="content-tip">注：交易费率仅供参考，手续费以基金公司确认为准。</div>
			</div>
		</div>
		<div class="content-sum">
			<div class="content">
				<h2 class="title">交易信息</h2>
				<ul class="business-info">
					<li>
						<div>认购状态</div>
						<div>{{applyDealStatus}}</div>
					</li>
					<li>
						<div>赎回状态</div>
						<div>{{redeemDealStatus}}</div>
					</li>
					<li>
						<div>定投状态</div>
						<div>{{fixDealStatus}}</div>
					</li>
					<li>
						<div>起购金额</div>
						<div>{{minBuy}}元</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import {getData, getQueryString} from '@/common/js/api'

export default {
	data(){
		return {
			innerCode: '',
			affirmRate: null,
			applyRate: null,
			redemptionRate: null,
			applyDealStatus: '',
			redeemDealStatus: '',
			fixDealStatus: '',
			minBuy: ''
		}
	},
	created(){
		this.changeUrl()
		this.getRate()
		this.getTrade()
	},
	methods: {
		// 获取url参数值
		changeUrl(){
			let innerCode = getQueryString('innerCode')
			if(innerCode){
				this.innerCode = innerCode
			}
		},
		// 获取费率信息
		getRate(){
			getData(`fund/${this.innerCode}/detail/info`, 'get').then((res) => {
				this.affirmRate = res.affirmRate
				this.applyRate = res.applyRate
				this.redemptionRate = res.redemptionRate
			})
		},
		// 获取交易信息
		getTrade(){
			getData(`fund/${this.innerCode}/base/info`, 'get').then((res) => {
				this.applyDealStatus = res.applyDealStatus
				this.redeemDealStatus = res.redeemDealStatus
				this.fixDealStatus = res.fixDealStatus
				this.minBuy = res.minBuy
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.content-sum{
	margin-top: 15px;
	.content{
		.title{
			border-bottom: 1px solid $border-color;
		}
		.content-table{
			border: 1px solid $border-color;
			margin-top: 26px;
			td {
				border: 1px solid $border-color;
				padding-left: 20px;
				&:first-child{
					width: 70%;
				}
				&:last-child{
					width: 30%;
				}
			}
		}
		.content-tip{
			margin-top: 24px;
			color: #999;
		}
		.business-info{
			li{
				padding: 24px 0;
				border-bottom: 1px solid $border-color;
				&:last-child{
					border-bottom: none;
				}
				div:first-child{
					float: left;
				}
				div:last-child{
					float: right;
				}
				&:after{
					display: block;
					content: "";
					clear: both;
				}
			}
		}
	}
}

</style>

