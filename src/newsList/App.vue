<template>
	<div class="content-sum">
		<ul class="support-nav clearfix">
			<li v-for="(nav, index) in navs" :key="index"  @click="changeNav(index)">
				<span :class="{on: nowIndex==index}">{{nav}}</span>
			</li>
		</ul>
		<div class="content">
			<div class="content-lists" v-show="nowIndex==0">
				<ul>
					<li v-for="(info, index) in newsList" :key="index">
						<a :href="'/newsContent.html?infoId='+info.id" class="lists-title" >
							<span class="title-detail no-wrap">{{info.title}}</span>
							<span class="hot" v-if="index<3" :style="{'width': '48px', 'height': '20px', 'background-size': '48px 20px'}"></span>
						</a>
						<div class="source">
							<span>麟龙基金</span><span>{{info.publishTime}}</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="content-lists" v-show="nowIndex==1">
				<ul>
					<li v-for="(info, index) in marketList" :key="index">
						<a :href="'/newsContent.html?infoId='+info.id" class="lists-title">
							<span class="title-detail no-wrap">{{info.title}}</span>
							<span class="hot" v-if="index<3"></span>
						</a>
						<div class="source">
							<span>麟龙基金</span><span>{{info.publishTime}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
import hot from '@/common/images/hot@2x.png'
import {getData} from '@/common/js/api'

var sw = true

export default {
	data(){
		return {
			navs: ['基金新闻', '市场信息'],
			nowIndex: 0,
			hot,
			currentPage1: 1,
			currentPage2: 1,
			pageSize: 10,
			categoryId1: 1,
			categoryId2: 2,
			totalPage1: null,
			totalPage2: null,
			newsList: [],
			marketList: []
		}
	},
	created(){
		this.getNewsList()
		this.getMarketList()
	},
	mounted(){
		this.moreInfoLoad()
		this.resizeInfoLoad()
	},
	methods:{
		// 导航切换
		changeNav(index){
			this.nowIndex = index
			$(window).scrollTop(0)
		},
		// 获取基金新闻列表信息
		getNewsList(){
			let currentPage = this.currentPage1
			let pageSize = this.pageSize
			let categoryId = this.categoryId1
			let data = {
				currentPage,
				pageSize,
				categoryId
			}
			getData('manage/info/0/summaryList/', 'get', data).then((res)=>{
				for(let i=0; i<res.list.length; i++){
					this.newsList.push(res.list[i])
				}
				this.totalPage1 = Math.ceil(res.totleCount/pageSize)
				sw = true
			})
		},
		// 获取市场信息列表
		getMarketList(){
			let currentPage = this.currentPage2
			let pageSize = this.pageSize
			let categoryId = this.categoryId2
			let data = {
				currentPage,
				pageSize,
				categoryId
			}
			getData('manage/info/0/summaryList/', 'get', data).then((res)=>{
				for(let i=0; i<res.list.length; i++){
					this.marketList.push(res.list[i])
				}
				this.totalPage2 = Math.ceil(res.totleCount/pageSize)
				sw = true
			})
		},
		// 滚动加载更多
		moreInfoLoad(){
			$(window).scroll(()=>{
				let scrollH = $(window).scrollTop()
				let screenH = $(window).height()
				let bodyH = $(document).height()
				if(scrollH + screenH >= bodyH){
					if(sw && this.nowIndex===0 && this.currentPage1<this.totalPage1){
						sw = false
						this.currentPage1 += 1
						this.getNewsList()
					}else if(sw && this.nowIndex===1 && this.currentPage2<this.totalPage2){
						sw = false
						this.currentPage2 += 1
						this.getMarketList()
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
@import '../common/styles/mixin.scss';
.content-sum{
	.support-nav{
		width: 100%;
		position: fixed;
		top: 0;
		background-color: $color-white;
		font-size: $font-size-ll;
		color: $font-color-d;
		li{
			width: 50%;
			text-align: center;
			float: left;
			padding-top: 28px;
			span{
				display: inline-block;
				padding-bottom: 22px;
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
			margin-top: 84px;
			ul{
				li{
					padding: 36px 0;
					border-top: 1px solid $border-color;
					.lists-title{
						display: block;
						font-size: 34px;
						color: $font-color-d;
						span{
							display: inline-block;
							vertical-align: middle;
							&.title-detail{
								max-width: 580px;
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

