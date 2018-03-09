<template>
	<div>
		<div class="content-sum">
			<h2 class="title">分红</h2>
			<table class="content-table">
				<tr>
					<td>权益登记日</td>
					<td>派发时期</td>
					<td>分红(元)</td>
				</tr>
				<tr v-for="(item, index) in bonus" :key="index">
					<td>{{item.bonusDate}}</td>
					<td>{{item.bonusDate}}</td>
					<td class="obvious">每份{{item.bonusInfo}}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
import {getData, getQueryString} from '@/common/js/api'

export default {
	data(){
		return {
			innerCode: '',
			bonus: null,
			currentPage: 1,
			pageSize: 10,
			totalPage: null
		}
	},
	created(){
		this.changeUrl()
		this.getBonus()
	},
	methods: {
		// 获取url参数值
		changeUrl(){
			let innerCode = getQueryString('innerCode')
			if(innerCode){
				this.innerCode = innerCode
			}
		},
		// 获取分红信息
		getBonus(){
			let currentPage = this.currentPage
			let pageSize = this.pageSize
			let data = {
				currentPage,
				pageSize
			}
			getData(`fund/${this.innerCode}/history/bonus`, 'get', data).then((res) => {
				this.bonus = res.list
				if(res.page.totalPage > 1){
					for(let i=1; i<res.page.totalPage; i++){
						this.currentPage += 1
						let newCurrentPage = this.currentPage
						let newData = {
							newCurrentPage,
							pageSize
						}
						getData(`fund/${this.innerCode}/history/bonus`, 'get', data).then((res) => {
							this.bonus.push(res.list)
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.content-sum{
	margin-top: 15px;
	.title{
		padding-top: 25px;
		margin-left: 22px;
	}
	.content-table{
		text-align: center;
		border-top: 1px solid $invest-table-bg;
		.obvious{
			color: #f7b709;
		}
	}
}
</style>

