<template>
	<div class="content-sum contentSum-style-reset">
		<ul>
			<li v-for="(item, index) in contentList" :key="index">
				<div class="content">
					<div class="title">{{item.title}}</div>
					<div class="info-details info-style-reset" v-html="item.content">
					</div>
					<!-- <div class="info-source">
						{{item.publishMedia}}
					</div>
					<div class="source">
						{{item.publishTime}}
					</div> -->
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import {getData} from '@/common/js/api'
import $ from 'jquery'

var swOpen = true
export default {
	data(){
		return {
			currentPage: 1,
			pageSize: 10,
			contentList: [],
			totalPage: null
		}
	},
	created(){
		this.getInfo()
	},
	mounted(){
		this.moreInfoLoad()
		this.resizeInfoLoad()
	},
	components:{
		echatsLine
	},
	methods: {
		// 获取披露信息
		getInfo(){
			let currentPage = this.currentPage
			let pageSize = this.pageSize
			let data = {
				currentPage,
				pageSize
			}
			getData(`manage/info/1/summaryList/`, 'get', data).then((res)=>{
				for(let i=0; i<res.list.length; i++){
					this.contentList.push(res.list[i])
				}
				this.totalPage = Math.ceil(res.totleCount/this.pageSize)
				swOpen = true
			})
		},
		// 滚动加载更多
		moreInfoLoad(){
			$(window).scroll(()=>{
				let scrollH = $(window).scrollTop()
				let screenH = $(window).height()
				let bodyH = $(document).height()
				if(scrollH + screenH >= bodyH){
					if(swOpen && this.currentPage<this.totalPage){
						swOpen = false
						this.currentPage += 1
						this.getInfo()
					}
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
	margin: 25px 30px;
	background-color: $border-color;
	ul{
		li{
			background-color: $color-white;
			margin-bottom: 36px;
			border-radius: 5px;
			.content{
				margin: 30px;
				padding: 30px 0;
				font-size: $font-size-ll;
				.title{
					padding-top: 0;
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
	}
}
</style>

<style lang="scss">
.info-style-reset{
	p{
		margin: 0 !important;
		white-space: normal !important;
		word-break: break-all !important;
		word-wrap: break-word !important;
	}
	img{
		display: block !important;
		width: 100% !important;
	}
	table{
		display: block !important;
		width: 100% !important;
		margin: 0 !important;
	}
	span{
		word-break: break-word !important;
	}
}
</style>
