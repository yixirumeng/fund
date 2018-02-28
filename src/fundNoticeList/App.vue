<template>
	<div class="content-sum">
		<div class="content">
			<div class="details-info">
				<ul>
					<li v-for="(item, index) in notice" :key="index" @click="sendUrl(item.filePath)">
						<div class="notice-info no-wrap">{{item.noticeTitle}}</div>
						<div class="notice-time">{{item.noticeDate}}</div>
					</li>
				</ul>
			</div>
			<div class="show-more" v-show="showMoreBtn" @click="clickShowMore">点击查看更多</div>
		</div>
	</div>
</template>

<script>
import {getData, getQueryString, callAppType} from '@/common/js/api'

export default {
	data(){
		return {
			innerCode: '',
			notice: [],
			currentPage: 1,
			pageSize: 10,
			totalPage: null,
			showMore: true,
			showMoreBtn: true
		}
	},
	created(){
		this.changeUrl()
		this.getNotice()
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
		// 获取公告信息
		getNotice(){
			getData(`fund/${this.innerCode}/notice/0/list/${this.currentPage}/${this.pageSize}`, 'get').then((res) => {
				this.showMore = true
				this.totalPage = res.page.totalPage
				for(let i=0; i<res.list.length; i++){
					this.notice.push(res.list[i])
				}
			})
		},
		// 基金公告点击发送url
		sendUrl(noticeUrl){
			callAppType('21', noticeUrl, '基金公告')
		},
		// 点击查看更多
		clickShowMore(){
			this.showMoreBtn = false
			this.currentPage += 1
			this.getNotice()
			this.moreInfoLoad()
		},
		moreInfoLoad(){
			window.onscroll = () => {
				let scrollH = document.documentElement.scrollTop || document.body.scrollTop,
					screenH = document.documentElement.clientHeight,
					bodyH = document.body.clientHeight
				if(this.showMore && (scrollH + screenH >= bodyH) && (this.currentPage < this.totalPage)){
					this.showMore = false
					this.currentPage += 1
					this.getNotice()
				}
			}
		},
		resizeInfoLoad(){
			window.onresize = () => {
				this.moreInfoLoad()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.content-sum{
	.content{
		margin: 0 30px;
		padding-bottom: 0;
		.details-info{
			margin-top: 50px;
			ul{
				li{
					padding: 20px 0;
					border-bottom: 1px solid $border-color;
					a{
						display: block;
					}
					.notice-info{
						font-size: $font-size-title;
						color: $font-color-d;
					}
					.notice-time{
						color: $font-color-s;
						margin-top: 20px;
					}
				}
			}
		}
	}
}
</style>

