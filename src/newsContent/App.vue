<template>
	<div class="content-sum">
		<div class="content">
			<div class="title">{{title}}</div>
			<div class="source">
				<span>{{publishMedia}}</span><span>{{publishTime}}</span>
			</div>
			<div class="content-details content-style-reset" v-html="content">
				
			</div>
		</div>
	</div>
</template>

<script>
import {getData, getQueryString} from '@/common/js/api'

export default {
	data(){
		return {
			infoId: '',
			title: '',
			publishMedia: '',
			publishTime: '',
			content: ''
		}
	},
	created(){
		this.getInfoId()
		this.getContent()
	},
	methods: {
		// 获取新闻详情ID
		getInfoId(){
			let infoId = getQueryString('infoId')
			this.infoId = infoId
		},
		// 获取新闻详情
		getContent(){
			getData(`manage/info/${this.infoId}/content`, 'get').then((res) => {
				this.title = res.title
				this.publishMedia = res.publishMedia
				this.publishTime = res.publishTime
				this.content = res.content
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.content-sum{
	.title{
		font-size: 46px;
		padding: 30px 0 36px;
		line-height: 1.5;
	}
	.content-details{
		margin-top: 50px;
		font-size: 34px;
		color: $font-color-d;
		line-height: 1.8;
		text-align: justify;
	}
}
</style>

<style lang="scss">
.content-style-reset{
	p{
		img{
			display: block !important;
			width: 100% !important;
			margin: 0 !important;
		}
		span{
			display: block !important;
			width: 100% !important;
			word-break: break-all !important;
			word-wrap: break-word !important;
		}
		em{
			display: block !important;
			width: 100% !important;
			word-break: break-all !important;
			word-wrap: break-word !important;
		}
	}
}
</style>

