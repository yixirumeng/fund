<template>
	<div>
		<div class="support-nav">
			<ul class="clearfix">
				<li v-for="(nav, index) in navs" :key="index" :class="{'nav-on': nowIndex==index}" @click="changeNav(index)">{{nav}}</li>
			</ul>
		</div>
		<div v-show="detail===0">
			<div class="content-sum">
				<h2 class="title clearfix">
					<span>重度持仓</span><span>2017年第三季度</span>
				</h2>
				<table class="content-table">
					<tr>
						<td>股票名称</td>
						<td>持仓占比</td>
					</tr>
					<tr>
						<td>
							<p>华泰柏瑞价值增长</p>
							<p class="support-code">050065</p>
						</td>
						<td>
							<p>97.3%</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>华泰柏瑞价值增长</p>
							<p class="support-code">050065</p>
						</td>
						<td>
							<p>97.3%</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>华泰柏瑞价值增长</p>
							<p class="support-code">050065</p>
						</td>
						<td>
							<p>97.3%</p>
						</td>
					</tr>
				</table>
			</div>
			<div class="content-sum">
				<h2 class="title clearfix">
					<span>持仓债券</span><span>2017年第三季度</span>
				</h2>
				<table class="content-table">
					<tr>
						<td>股票名称</td>
						<td>持仓占比</td>
					</tr>
					<tr>
						<td>
							<p>华泰柏瑞价值增长</p>
							<p class="support-code">050065</p>
						</td>
						<td>
							<p>97.3%</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>华泰柏瑞价值增长</p>
							<p class="support-code">050065</p>
						</td>
						<td>
							<p>97.3%</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>华泰柏瑞价值增长</p>
							<p class="support-code">050065</p>
						</td>
						<td>
							<p>97.3%</p>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div v-show="detail===1">
			<div class="content-sum">
				<h2 class="title title1 clearfix">
					<span>配置详情</span><span>2017年第三季度</span>
				</h2>
				<div class="content">
					<table class="content-table content-table1">
						<tr>
							<td>行业类别</td>
							<td>市值(万元)</td>
							<td>占净值比</td>
						</tr>
						<tr>
							<td>
								<div>电力、热力、燃气及水生产和供应业</div>
							</td>
							<td>
								18,270.32
							</td>
							<td>
								83.41%
							</td>
						</tr>
						<tr>
							<td>
								<div>电力、热力、燃气及水生产和供应业</div>
							</td>
							<td>
								18,270.32
							</td>
							<td>
								83.41%
							</td>
						</tr>
						<tr>
							<td>
								<div>电力、热力、燃气及水生产和供应业</div>
							</td>
							<td>
								18,270.32
							</td>
							<td>
								83.41%
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div v-show="detail===2">
			<div class="content-sum">
				<h2 class="title title1 clearfix">
					<span>配置详情</span><span>2017年第四季度</span>
				</h2>
				<div class="content">
					<table class="content-table">
						<tr>
							<td>项目</td>
							<td>数据</td>
						</tr>
						<tr>
							<td>
								股票占净比
							</td>
							<td>
								93.29%
							</td>
						</tr>
						<tr>
							<td>
								债券占净比
							</td>
							<td>
								--
							</td>
						</tr>
						<tr>
							<td>
								现金占净比
							</td>
							<td>
								10.64%
							</td>
						</tr>
						<tr>
							<td>
								净资产(亿元)
							</td>
							<td>
								0.34
							</td>
						</tr>
					</table>
					<div class="content-tip">
						<p>占净值比例：基金占净资产比例。</p>
						<p>友情提示：如果出现各资产总和占净值比例超过100%的现象，一般是由于基金在运作过程中存在负债，如存在应付款或债券质押杠杆交易等情况。</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			navs: ['持仓明细', '行业配置', '资产配置'],
			nowIndex: 0,
			detail: 0
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
.support-nav{
	font-size: $font-size-ll;
	color: $font-color-d;
	background: $color-white;
	padding: 0 30px;
	ul{
		li{
			box-sizing: border-box;
			float: left;
			margin-right: 160px;
			padding: 28px 0 22px;
			&:last-child{
				margin-right: 0;
			}
		}
	}
}

.content-sum{
	margin-top: 15px;
	.title{
		span{
			padding: 0 30px;
			&:first-child{
				float: left;
			}
			&:last-child{
				float: right;
				font-size: $font-size-n;
				color: $font-color-n;
			}
		}
	}
	.title1{
		border-bottom: 1px solid $border-color;
	}
	.content{
		margin: 0 30px;
	}
	.content-table{
		border: 1px solid $border-color;
		margin-top: 26px;
		tr{
			border: 1px solid $border-color;
			td {
				padding-left: 30px;
				p{
					color: $font-color-d;
					&.support-code{
						margin-top: 20px;
						color: $font-color-n;
					}
				}
			}
		}
	}
	.content-table1{
		tr{
			td{
				&:nth-child(1){
					width: 46%;
				}
				&:nth-child(2){
					width: 28%;
				}
				&:nth-child(3){
					width: 26%;
				}
				div{
					line-height: 1.4;
				}
			}
		}
	}
	.content-tip{
		margin-top: 24px;
		color: #999;
		font-size: $font-size-n;
		p{
			line-height: 1.5;
			letter-spacing: 2px;
		}
	}
}
</style>

