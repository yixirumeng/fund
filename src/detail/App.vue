<template>
	<div class="income">
		<h2>累计收益</h2>
		<div class="income-chart">
			<ul class="chart-nav">
				<li v-for="(nav, index) in navs" :key="index" :class="{on: navSelect==index}" @click="changeBg(index)">
					{{nav}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import {getData} from '@/common/js/api'

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
		  getData(`${this.innerCode}/${this.dateRange}/totalnet/list`, 'get').then((res)=>{
			  console.log(res)
		  })
	  },
	  methods: {
		  changeBg(index){
			  this.navSelect = index
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
		.chart-nav{
			li{
				float: left;
				width: 150px;
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
	}
}
</style>
