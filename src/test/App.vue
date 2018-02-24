<template>
	<div class="test" ref="test">
		<ul class="clearfix" ref="testul">
			<li v-for="(item, index) in liList" :key="index" @click="liClick(item)">{{item}}</li>
		</ul>
		<div>会尽快发</div>
	</div>
</template>

<script>
import {getData, getQueryString} from '@/common/js/api'
import BScroll from 'better-scroll'

export default {
	data(){
		return {
			liList: []
		}
	},
	created(){
		this.getLi()
	},
	mounted(){
		this.$nextTick(() => {
			this.scroll = new BScroll(this.$refs.test, {
				scrollX: true,
				scrollY: false,
				click: true
			})
		})
	},
	methods: {
		liClick(msg){
			alert(msg)
		},
		getLi(){
			getData('manage/info/category', 'get').then((res) => {
				console.log(res)
				for(let i=0; i<res.list.length; i++){
					this.liList.push(res.list[i].category)
				}
				this.$refs.testul.style.width = '500%'
				// this.$nextTick(() => {
				// 	this.scroll = new BScroll(this.$refs.test, {
				// 		scrollX: true,
				// 		scrollY: false,
				// 		click: true
				// 	})
				// })
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.test{
	font-size: 40px;
	width: 100%;
	height: 40px;
	margin-top: 50px;
	overflow: hidden;
	-webkit-overflow-scrolling: touch;
	ul{
		// width: 500%;
		li{
			float: left;
			margin-right: 20px;
		}
	}
}

</style>

