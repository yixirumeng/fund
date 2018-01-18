<template>
	<div>
		<div class="content-sum">
			<div class="content">
				<h2 class="title">认购</h2>
				<table class="content-table">
					<tr>
						<td width="70%">认购金额（M）</td>
						<td width="30%">费率</td>
					</tr>
					<tr>
						<td width="70%">购买金额&lt;100万</td>
						<td width="30%">0.80%</td>
					</tr>
					<tr>
						<td width="70%">100万&le;购买金额&le;300万</td>
						<td width="30%">0.50%</td>
					</tr>
					<tr>
						<td width="70%">300万&le;购买金额&le;500万</td>
						<td width="30%">0.30%</td>
					</tr>
					<tr>
						<td width="70%">购买金额&gt;500万</td>
						<td width="30%">每笔1000元</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="content-sum">
			<div class="content">
				<h2 class="title">买入</h2>
				<table class="content-table">
					<tr>
						<td width="70%">认购金额（M）</td>
						<td width="30%">费率</td>
					</tr>
					<tr>
						<td width="70%">购买金额&lt;100万</td>
						<td width="30%">0.80%</td>
					</tr>
					<tr>
						<td width="70%">100万&le;购买金额&le;300万</td>
						<td width="30%">0.50%</td>
					</tr>
					<tr>
						<td width="70%">300万&le;购买金额&le;500万</td>
						<td width="30%">0.30%</td>
					</tr>
					<tr>
						<td width="70%">购买金额&gt;500万</td>
						<td width="30%">每笔1000元</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="content-sum">
			<div class="content">
				<h2 class="title">卖出</h2>
				<table class="content-table">
					<tr>
						<td width="70%">持有期限(T)</td>
						<td width="30%">费率</td>
					</tr>
					<tr>
						<td width="70%">持有期限&lt;1年</td>
						<td width="30%">0.10%</td>
					</tr>
					<tr>
						<td width="70%">1年&le;持有期限&le;2年</td>
						<td width="30%">0.05%</td>
					</tr>
					<tr>
						<td width="70%">持有期限&le;2年</td>
						<td width="30%">0.00%</td>
					</tr>
				</table>
				<div class="content-tip">注：交易费率仅供参考，手续费以基金公司确认为准。</div>
			</div>
		</div>
		<div class="content-sum">
			<div class="content">
				<h2 class="title">交易信息</h2>
				<ul class="business-info">
					<li>
						<div>买入状态</div>
						<div>开放</div>
					</li>
					<li>
						<div>卖出状态</div>
						<div>开放</div>
					</li>
					<li>
						<div>定投状态</div>
						<div>开放</div>
					</li>
					<li>
						<div>起购金额</div>
						<div>100.00元</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.content{
	.title{
		border-bottom: 1px solid $border-color;
	}
	.content-table{
		border: 1px solid $border-color;
		margin-top: 26px;
		td {
            border: 1px solid $border-color;
            padding-left: 20px;
        }
	}
	.content-tip{
		margin-top: 24px;
		color: #999;
	}
	.business-info{
		li{
			padding: 24px 0;
			border-bottom: 1px solid $border-color;
			&:last-child{
				border-bottom: none;
			}
			div:first-child{
				float: left;
			}
			div:last-child{
				float: right;
			}
			&:after{
				display: block;
				content: "";
				clear: both;
			}
		}
	}
}
</style>

