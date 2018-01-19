<template>
	<div class="content-sum">
		<div class="content">
			<div class="title">{{title}}</div>
			<div class="info-details" v-html="content">
				
			</div>
			<div class="info-source">
				好友基金
			</div>
			<div class="source">
				<span>2017.12.07</span><span>14:40:53</span>
			</div>
		</div>
	</div>
</template>

<script>
import {getData} from '@/common/js/api'

export default {
	data(){
		return {
			title: '',
			content: ''
		}
	},
	created(){
		this.getInfo()
	},
	methods: {
		getInfo(){
			getData('manage/info/44/content', 'get').then((res)=>{
				console.log(res)
				if(res.code === 0){
					this.title = res.content.title
					this.content = res.content.content
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.content-sum{
	margin: 25px 30px;
	.content{
		margin: 30px;
		font-size: $font-size-ll;
		.title{
			padding-top: 30px;
			padding-bottom: 30px;
			font-size: $font-size-title;
			line-height: 1.5;
		}
		.info-source{
			margin: 30px 0;
			text-align: right;
		}
	}
}
</style>

