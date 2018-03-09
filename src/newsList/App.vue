<template>
	<div class="content-sum">
		<div class="news-title" ref="nav">
			<ul ref="navSum" :class="[navs.length<3 ? 'nav-small' : 'nav-large', 'support-nav']">
				<li v-for="(nav, index) in navs" :key="index"  @click="changeNav(index, nav.id)">
					<span :class="{on: nowIndex==index}">{{titleFormat(nav.category)}}</span>
				</li>
			</ul>
		</div>
		<div class="content">
			<div class="content-lists" v-for="(item, index) in navs" :key="index" v-show="nowIndex === index">
				<ul>
					<li v-for="(info, index) in newsList" :key="index">
						<div class="lists-title" @click="callContent(info.id)">
							<span :class="[index<3 ? 'title-small' : 'title-large', 'no-wrap']">{{info.title}}</span>
							<span class="hot" v-if="index<3" :style="{'width': '48px', 'height': '20px', 'background-size': '48px 20px'}"></span>
						</div>
						<div class="source">
							<span>{{info.publishMedia}}</span><span>{{info.publishTime}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import {getData, callAppType, depositPath} from '@/common/js/api'

export default {
	data(){
		return {
			navs: [],
			nowIndex: 0,
			currentPage: 1,
			pageSize: 10,
			totalPage: null,
			newsList: [],
			showMore: true
		}
	},
	created(){
		this.getNewsTitle()
	},
	mounted(){
		this.moreInfoLoad()
		this.resizeInfoLoad()
	},
	methods:{
		// 导航切换
		changeNav(index, categoryId){
			this.nowIndex = index
			this.currentPage = 1
			this.newsList = []
			this.getLists(categoryId)
		},
		// 获取理财资讯标题
		getNewsTitle(){
			getData('manage/info/category', 'get').then((res) => {
				let l = res.list.length>4 ? 4 : res.list.length
				for(let i=0; i<l; i++){
					this.navs.push(res.list[i])
				}
				this.$nextTick(() => {
					this.scroll = new BScroll(this.$refs.nav, {
						scrollX: true,
						scrollY: false,
						click: true
					})
				})
				return res.list[0].id
			}).then((res1) => {
				this.getLists(res1)
			})
		},
		// 理财资讯标题格式处理
		titleFormat(title){
			if(title.length<4){
				return title
			}else{
				let formatTitle = title.substr(0, 4)
				return formatTitle
			}
		},
		// 点击文章跳转详情
		callContent(id){
			callAppType('1', `${depositPath}newsContent.html?infoId=${id}`, '新闻内容')
		},
		// 获取文章列表
		getLists(categoryId){
			let data = {
				categoryId,
				currentPage: this.currentPage,
				pageSize: this.pageSize
			}
			getData(`manage/info/0/summaryList/`, 'get', data).then((res) => {
				this.totalPage = Math.ceil(res.totleCount/this.pageSize)
				let l = res.list.length
				for(let i=0; i<l; i++){
					this.newsList.push(res.list[i])
				}
				this.showMore = true
			})
		},
		// 滚动加载更多
		moreInfoLoad(){
			window.onscroll = () => {
				let scrollH = document.documentElement.scrollTop || document.body.scrollTop
				let screenH = document.documentElement.clientHeight
				let bodyH = document.body.clientHeight
				if(scrollH + screenH >= bodyH){
					if(this.showMore && this.currentPage<this.totalPage){
						this.showMore = false
						this.currentPage += 1
						this.getLists(this.nowIndex+1)
					}
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
@import '~styles/variables.scss';
.content-sum{
	.news-title{
		width: 92%;
		margin-left: 30px;
		margin-right: 30px;
		overflow: hidden;
		height: 86px;
	}
	.support-nav{
		background-color: $color-white;
		font-size: $font-size-ll;
		color: $font-color-d;
		border-bottom: 1px solid $border-color; /*no*/
		white-space: nowrap;
		&.nav-small{
			display: block;
			li{
				width: 50%;
			}
		}
		&.nav-large{
			display: inline-block;
			li{
				margin-left: 80px;
				margin-right: 80px;
			}
		}
		li{
			display: inline-block;
			text-align: center;
			margin-top: 28px;
			span{
				display: inline-block;
				padding-bottom: 22px;
				font-weight: 600;
				&.on{
					border-bottom: 6px solid $font-color-r;
					color: $font-color-r;
				}
			}
		}
	}
	.content{
		margin: 0 30px;
		padding-bottom: 0;
		.content-lists{
			ul{
				li{
					padding: 36px 0;
					border-top: 1px solid $border-color; /*no*/
					&:first-child{
						border-top: none;
					}
					.lists-title{
						line-height: 1.2;
						font-size: 34px;
						color: $font-color-d;
						span{
							display: inline-block;
							vertical-align: middle;
							&.title-small{
								max-width: 580px;
							}
							&.title-large{
								width: 100%
							}
							&.hot{
								background-image: url('../common/images/new@2x.png');
							}
						}
					}
					.source{
						margin-top: 20px;
					}
				}
			}
		}
	}
}
</style>