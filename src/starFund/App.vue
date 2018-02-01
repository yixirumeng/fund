<template>
	<div class="star">
		<img :src="starFund" alt="明星基金">
		<div class="star-fund">
			<ul>
				<li>
					<a href="">
						<div>
							<p>中融智选福萨</p>
							<p>躁动行情下&nbsp;&nbsp;收益长虹</p>
						</div>
						<div>
							<p>13.63%</p>
							<p>近六月收益</p>
						</div>
					</a>
				</li>
				<li>
					<a href="">
						<div>
							<p>中融智选C</p>
							<p>躁动行情下&nbsp;&nbsp;收益长虹</p>
						</div>
						<div>
							<p>46.39%</p>
							<p>近六月收益</p>
						</div>
					</a>
				</li>
				<li>
					<a href="">
						<div>
							<p>中融智选C</p>
							<p>躁动行情下&nbsp;&nbsp;收益长虹</p>
						</div>
						<div>
							<p>19.01%</p>
							<p>近六月收益</p>
						</div>
					</a>
				</li>
				<li>
					<a href="">
						<div>
							<p>中融智选C</p>
							<p>躁动行情下&nbsp;&nbsp;收益长虹</p>
						</div>
						<div>
							<p>41.02%</p>
							<p>近六月收益</p>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import starFund from '@/common/images/starFund1.png'

export default {
	data(){
		return {
			starFund
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.star{
	position: relative;
	img{
		display: block;
		width: 100%;
	}
	.star-fund{
		position: absolute;
		top: 630px;
		width: 100%;
		ul{
			margin: 0 40px;
			li{
				width: 100%;
				margin-bottom: 30px;
				border-radius: 16px;
				background-color: $color-white;
				a{
					display: block;
					width: 100%;
					height: 100%;
					padding: 45px 30px;
					&::after{
						display: block;
						clear: both;
						content: "";
						visibility: hidden;
					}
					div:first-child{
						float: left;
						p:first-child{
							font-size: $font-size-title;
							color: $font-color-r;
							margin-bottom: 30px;
						}
						p:last-child{
							font-size: $font-size-ll;
							color: $font-color-n;
						}
					}
					div:last-child{
						float: right;
						margin-top: -10px;
						p:first-child{
							font-size: 60px;
							color: $font-color-r;
							margin-bottom: 22px;
						}
						p:last-child{
							font-size: 24px;
							color: $font-color-n;
							text-align: right;
						}
					}
				}
			}
		}
	}
}
</style>