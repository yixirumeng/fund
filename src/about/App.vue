<template>
	<div>
		<div class="content">
			<div class="logo" :style="{width: '61px', height: '61px', backgroundSize: '61px 61px'}"></div>
			<p>沈阳麟龙科技股份有限公司成立于2002年1月，注册资本36337.5万元，2014年1月24日成为全国中小企业股份转让系统扩容后的首批挂牌企业，成功登录新三板，证券简称：麟龙股份，证券代码：430515。</p>
			<p>沈阳麟龙投资顾问有限公司是沈阳麟龙科技股份有限公司的全资子公司，成立于2011年1月，注册资本为1亿元。2016年9月获得中国证监会颁发的基金销售业务资格牌照。麟龙投顾是一家致力于满足客户证券投资咨询、基金理财投资需求的专业公司。</p>
			<p>麟龙投顾的管理团队是由银行、证券、基金等金融机构资深从业人员组成，拥有丰富的行业经验。团队致力于成为中国智能化理财平台的领跑者。</p>
			<div class="version">
				<p>版本所有：沈阳麟龙投资顾问有限公司</p>
				<p>版本号：00000000000000</p>
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
	color: $font-color-d;
	.logo{
		margin: 60px auto 54px;
		background-image: url("../common/images/logo.png");
	}
	&>p{
		font-size: $font-size-ll;
		line-height: 1.6;
		text-indent: 2em;
		text-align: justify;
	}
	.version{
		font-size: 28px;
		margin-top: 50px;
		color: $font-color-s;
		text-align: center;
		p{
			line-height: 1.6;
		}
	}
}

</style>

