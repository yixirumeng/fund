<template>
	<div>
		<div class="content-sum">
			<table class="content-table" v-if="fundType === 0">
				<tr>
					<td>日期</td>
					<td>单位净值</td>
					<td>累计净值</td>
					<td>日涨幅</td>
				</tr>
				<tr v-for="(item, index) in fondNet" :key="index">
					<td>{{item.netDate}}</td>
					<td>{{item.unitNet}}</td>
					<td>{{item.totalNet}}</td>
					<td>{{item.rangeDay}}</td>
				</tr>
			</table>
			<table class="content-table" v-if="fundType === 1">
				<tr>
					<td>日期</td>
					<td>七日年化</td>
					<td>万份收益</td>
				</tr>
				<tr v-for="(item, index) in historyProfit" :key="index">
					<td>{{item.accrualDate}}</td>
					<td>{{item.SevenDaysYield | netFormat | percentFormat}}</td>
					<td>{{item.tenThousandAccrual | netFormat}}</td>
				</tr>
			</table>
			<div class="show-more" v-show="showMoreBtn" @click="clickShowMore">点击查看更多</div>
		</div>
	</div>
</template>

<script>
import {getData, getQueryString} from '@/common/js/api'

export default {
	data(){
		return {
			innerCode: '',
			fundType: '',
			currentPage: 1,
			pageSize: 10,
			totalPage: null,
			fondNet: [],
			historyProfit: [],
			showMore: true,
			showMoreBtn: true
		}
	},
	created(){
		this.changeUrl()
		this.getNet()
	},
	mounted(){
		this.resizeInfoLoad()
	},
	methods: {
		// 获取url参数值
		changeUrl(){
			this.innerCode = getQueryString('innerCode')
			this.fundType = Number(getQueryString('fundType'))
		},
		// 获取基金净值
		getNet(){
			let data = {
				currentPage: this.currentPage,
				pageSize: this.pageSize
			}
			if(this.fundType === 0){
				getData(`fund/${this.innerCode}/history/net`, 'get', data).then((res) => {
					this.showMore = true
					let netL = res.list.length
					this.totalPage = res.page.totalPage
					for(let i=0; i<netL; i++){
						this.fondNet.push(res.list[i])
					}
				})
			}else if(this.fundType === 1){
				getData(`fund/${this.innerCode}/history/accrual`, 'get', data).then((res) => {
					this.showMore = true
					let profitL = res.list.length
					this.totalPage = res.page.totalPage
					for(let j=0; j<profitL; j++){
						this.historyProfit.push(res.list[j])
					}
				})
			}
			
		},
		// 点击查看更多
		clickShowMore(){
			this.showMoreBtn = false
			this.currentPage += 1
			this.getNet()
			this.moreInfoLoad()
		},
		// 页面滚动，显示更多数据
		moreInfoLoad(){
			window.onscroll = () => {
				let scrollH = document.documentElement.scrollTop || document.body.scrollTop,
					screenH = document.documentElement.clientHeight,
					bodyH = document.body.clientHeight
				if(this.showMore && (scrollH + screenH >= bodyH) && (this.currentPage < this.totalPage)){
					this.showMore = false
					this.currentPage += 1
					this.getNet()
				}
			}
		},
		resizeInfoLoad(){
			window.onresize = () => {
				this.moreInfoLoad()
			}
		}
	},
	filters: {
		netFormat(net){
			if(net === null){
				return '--'
			}else{
				return net
			}
		},
		percentFormat(value){
			if(value === '--'){
				return '--'
			}else{
				return `${value}%`
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.content-sum{
	.content-table{
		margin-top: 50px;
		text-align: center;
		border-top: 1px solid $border-color;
		tr:nth-child(2n-1){
			background-color: $nav-bg-color;
		}
	}
}
</style>

