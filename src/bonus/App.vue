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
				<tr v-for="(info, index) in bonusInfos" :key="index">
					<td>{{info.bonusDate}}</td>
					<td>{{info.bonusDate}}</td>
					<td class="obvious">每份{{info.bonusInfo}}000</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
import {getData} from '@/common/js/api'

export default {
	data(){
		return {
			bonusParam: {
				innerCode: 15776,
				currentPage: 1,
				pageSize: 10
			},
			bonusInfos: null
		}
	},
	created(){
		this.getBonus()
	},
	methods: {
		getBonus(){
			getData('fund/15776/history/bonus', 'get', this.bonusParam).then((res) => {
				if(res.code === 0){
					this.bonusInfos = res.content.list
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.content-sum{
	.title{
		padding-top: 25px;
		margin-left: 22px;
	}
	.content-table{
		text-align: center;
		border-top: 1px solid $border-color;
		.obvious{
			color: #f7b709;
		}
	}
}
</style>

