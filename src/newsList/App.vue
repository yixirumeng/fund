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
					<li>
						<div class="lists-title">
							理财基金：细说定投
							<span class="hot"></span>
						</div>
						<div class="source">
							<span>证券时报</span><span>3小时前</span>
						</div>
					</li>
					<li>
						<div class="lists-title">理财基金：细说定投</div>
						<div class="source">
							<span>证券时报</span><span>3小时前</span>
						</div>
					</li>
					<li>
						<div class="lists-title">理财基金：细说定投</div>
						<div class="source">
							<span>证券时报</span><span>3小时前</span>
						</div>
					</li>
					<li>
						<div class="lists-title">理财基金：细说定投</div>
						<div class="source">
							<span>证券时报</span><span>3小时前</span>
						</div>
					</li>
					<li>
						<div class="lists-title">理财基金：细说定投</div>
						<div class="source">
							<span>证券时报</span><span>3小时前</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import hot from '@/common/images/hot@2x.png'
export default {
	data(){
		return {
			navs: ['基金新闻', '市场信息'],
			nowIndex: 0,
			detail: 0,
			hot
		}
	},
	methods:{
		changeNav(index){
			this.nowIndex = index
			this.detail = index
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
						.hot{
							display: inline-block;
							vertical-align: middle;
							width: 96px;
							height: 40px;
							margin-top: -10px;
							@include bg-image('../common/images/hot')
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

