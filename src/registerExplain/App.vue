<template>
	<div class="register">
		点击按钮即代表您已阅读并充分了解<span @click="callOnline">《沈阳麟龙网上交易协议》</span><span @click="callRights">《沈阳麟龙投资者权益须知》</span><span @click="callAccess">《沈阳麟龙公募基金投资准入要求》</span>
	</div>
</template>

<script>
import {callAppType, depositPath} from '@/common/js/api'

export default {
	methods: {
		callOnline(){
			callAppType('1', `${depositPath}onlineTrade.html`, '协议详情')
		},
		callRights(){
			callAppType('1', `${depositPath}investorRights.html`, '协议详情')
		},
		callAccess(){
			callAppType('1', `${depositPath}investmentAccess.html`, '协议详情')
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
body{
	background-color: $border-color;
}

.register{
	background-color: $border-color;
	font-size: $font-size-n;
	text-align: justify;
	line-height: 1.6;
	span{
		color: $font-color-r;
	}
}
</style>