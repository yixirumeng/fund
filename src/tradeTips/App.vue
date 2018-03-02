<template>
	<div>
		<div class="content">
			<!-- <h3>交易提示</h3> -->
			<p>1、我们将24小时受理您的交易申请。您交易日的交易申请至 15:00截止，15:00以后的交易申请或非交易日的交易申请视为于下一个交易日提交。您最终申请提交时间以我司注册登记中心接收时间为准。</p>
			<p>2、由于客户端系统时间与服务器时间可能有误差，请尽量避免在交易截止时间前后进行交易，交易提交时间以本系统服务器时间为准。</p>
			<p>3、如果您的申购款已经扣款成功，则撤单款最晚将于T+2日划往您预留的银行账户,具体到账时间以银行实际到账时间为准。</p>
			<p>4、您在申请日15：00以前可以撤销当天提交的交易申请。 </p>
			<p>5、基金的申购、赎回交易均遵循“未知价”交易原则，即您申购、赎回基金时都按提交业务申请当天的净值计算，而每天的净值是在交易结束后计算出来的。</p>
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
	// h3{
	// 	font-size: $font-size-title;
	// 	color: $font-color-d;
	// 	margin-top: 60px;
	// 	margin-bottom: 35px;
	// 	text-align: center;
	// 	&:before, &:after{
	// 		display: inline-block;
	// 		content: "";
	// 		width: 60px;
	// 		height: 2px;
	// 		background-color: #bdbdbd;
	// 		vertical-align: middle;
	// 	}
	// 	&:before{
	// 		margin-right: 10px;
	// 	}
	// 	&:after{
	// 		margin-left: 10px;
	// 	}
	// }
	padding-top: 60px;
	p{
		font-size: $font-size-ll;
		color: $font-color-n;
		line-height: 1.6;
		text-align: justify;
	}
}

</style>

