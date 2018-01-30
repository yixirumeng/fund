<template>
	<div class="content-sum">
		<div class="content">
			<div class="title">{{title}}</div>
			<div class="source">
				<span>{{publishMedia}}</span><span>{{publishTime}}</span>
			</div>
			<div class="content-details" v-html="content">
				
			</div>
		</div>
	</div>
</template>

<script>
import {getData, getQueryString} from '@/common/js/api'
import $ from 'jquery'

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
				console.log(res)
				this.title = res.title
				this.publishMedia = res.publishMedia
				this.publishTime = res.publishTime
				this.content = res.content
			}).then(()=>{
				this.styleReset()
			})
		},
		// 对新闻内容文本样式重置
		styleReset(){
			$('.content-details').find('img').css({
				'margin': '0',
				'display': 'block',
				'width': '100%',
				'word-break': 'break-all',
				'word-wrap':'break-word'
			})
			$('.content-details span').css({
				'display': 'block',
				'width': '100%',
				'word-break': 'break-all',
				'word-wrap':'break-word'
			})
			$('.content-details em').css({
				'display': 'block',
				'width': '100%',
				'word-break': 'break-all',
				'word-wrap':'break-word'
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
		p{
			img{
				display: block !important;
				width: 100% !important;
				margin: 0 !important;
			}
		}
	}
}
</style>

