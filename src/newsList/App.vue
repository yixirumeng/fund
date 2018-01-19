<template>
	<div class="content-sum">
		<div class="content">
			<ul class="support-nav clearfix">
				<li v-for="(nav, index) in navs" :key="index"  @click="changeNav(index)">
					<span :class="{on: nowIndex==index}">{{nav}}</span>
				</li>
			</ul>
			<div class="content-lists">
				<ul>
					<li v-for="(info, index) in listInfo" :key="index">
						<div class="lists-title">
							<span class="title-detail no-wrap">{{info.title}}</span>
							<span class="hot" v-if="index<3"></span>
						</div>
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
import hot from '@/common/images/hot@2x.png'
import {getData} from '@/common/js/api'
export default {
	data(){
		return {
			navs: ['基金新闻', '市场信息'],
			nowIndex: 0,
			detail: 0,
			hot,
			pageInfo: {
				currentPage: 1,
				pageSize: 10,
				categoryId: 1
			},
			listInfo: null
		}
	},
	created(){
		this.getNewsList()
		
	},
	methods:{
		changeNav(index){
			this.nowIndex = index
			this.detail = index
		},
		getNewsList(){
			getData('manage/info/0/summaryList/', 'get', this.pageInfo).then((res)=>{
				if(res.code === 0){
					this.listInfo = res.content.list
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
@import '../common/styles/mixin.scss';
.content-sum{
	margin-top: 0;
	.content{
		margin: 0 30px;
		padding-bottom: 0;
		.support-nav{
			font-size: $font-size-ll;
			color: $font-color-d;
			li{
				width: 50%;
				text-align: center;
				box-sizing: border-box;
				float: left;
				padding-top: 28px;
				&:last-child{
					margin-right: 0;
				}
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
		.content-lists{
			ul{
				li{
					padding: 36px 0;
					border-top: 1px solid $border-color;
					.lists-title{
						font-size: 34px;
						color: $font-color-d;
						span{
							display: inline-block;
							vertical-align: middle;
							&.title-detail{
								max-width: 580px;
							}
							&.hot{
								width: 96px;
								height: 40px;
								@include bg-image('../common/images/hot')
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

