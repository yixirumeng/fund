<template>
	<div>
		<div class="content">
			<p>沈阳麟龙投资顾问有限公司：</p>
			<div class="content-indent">
				<p>本人（授权人）现就本人所开立的银行账户，授权贵公司（被授权人）通过贵公司指定的第三方支付机构及商业银行按照本人在贵公司金基窝平台上的交易申请金额从本人银行账户主动进行交易资金的代收扣收，用于完成本人的合同资金交付；同时本人确认并授权贵公司有权依据与第三方支付机构及商业银行预订的支付方式（包括不限于银企直连、快捷支付等支付方式）进行交易资金的划付。</p>
				<p>本账户所有人现将本人所开立的账户：</p>
				<p>账户姓名：{{accountName}}</p>
				<p>账户账号：--</p>
				<p>账户开户行名称：--</p>
				<p>账户开立证件类型：{{certType}}</p>
				<p>账户开立证件号码：{{certNumber}}</p>
				<p>本人保证上述数据真实、准确。</p>
				<p>本人在此声明已清楚已知悉本次授权代收的性质和后果。</p>
				<p>未经本人签署《银行自动转账授权终止通知书》之前，本授权持续有效。</p>
			</div>
			<div class="content-right">
				<p>立授权人：{{accountName}}</p>
				<p>日期：{{currentDate}}</p>
			</div>
		</div>
	</div>
</template>

<script>
import {getQueryString} from '@/common/js/api'

export default {
	data(){
		return {
			accountName: '',
			certType: '',
			certNumber: '',
			currentDate: ''
		}
	},
	created(){
		this.getParams()
		this.getCurrentDate()
	},
	methods: {
		getParams(){
			this.accountName = decodeURIComponent(getQueryString('accName'))
			this.certType = decodeURIComponent(getQueryString('certType'))
			this.certNumber = getQueryString('certNumber')
		},
		getCurrentDate(){
			let date = new Date(),
				year = date.getFullYear(),
				month = date.getMonth() + 1,
				day = date.getDate()
			this.currentDate = `${year}年${month}月${day}日`
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.content{
	font-size: $font-size-ll;
	margin-top: 45px;
	p{
		line-height: 1.6;
		text-align: justify;
	}
	.content-indent{
		text-indent: 2em;
	}
	.content-right{
		p{
			text-align: right;
		}
	}
}

</style>

