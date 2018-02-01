<template>
	<div>
		<div class="content-sum">
			<table class="content-table">
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
			<div class="show-more" v-show="showMore" @click="clickShowMore">点击查看更多</div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
import {getData, getQueryString} from '@/common/js/api'

export default {
	data(){
		return {
			innerCode: '',
			currentPage: 1,
			pageSize: 10,
			totalPage: null,
			fondNet: [],
			showMore: true
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
			let innerCode = getQueryString('innerCode')
			if(innerCode){
				this.innerCode = innerCode
			}
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
				this.totalPage = res.page.totalPage
				for(let i=0; i<res.list.length; i++){
					this.fondNet.push(res.list[i])
				}
			})
		},
		// 点击查看更多
		clickShowMore(){
			this.currentPage += 1
			this.getNet()
			this.showMore = false
			this.moreInfoLoad()
		},
		// 页面滚动，显示更多数据
		moreInfoLoad(){
			$(window).scroll(()=>{
				let scrollH = $(window).scrollTop()
				let screenH = $(window).height()
				let bodyH = $(document).height()
				if((scrollH + screenH >= bodyH) && (this.currentPage <= this.totalPage)){
					this.currentPage += 1
					this.getNet()
				}
			})
		},
		resizeInfoLoad(){
			$(window).resize(() => {
				this.moreInfoLoad()
			})
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

