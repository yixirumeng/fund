<template>
	<div class="invest-sum">
		<div class="invest">
			<div class="result-title">您的风险等级：</div>
			<img :src="riskResult" alt="风险测评结果" class="result-img">
			<div class="result-msg">{{resultMsg}}</div>
			<div class="result-info">建议选择基金<span>中高风险</span></div>
			<div class="complete">完成</div>
			<div class="restart" @click="restart">重新测评</div>
			<div class="result-tips">
				<p>重要提示：</p>
				<p>以上信息仅供投资者参考，不作为投资者决策的依据。</p>
			</div>
		</div>
	</div>
</template>

<script>
import riskResult from '@/common/images/riskResult.png'
import {getData, getQueryString} from '@/common/js/api'

export default {
	data(){
		return {
			riskResult,
			eligContent: '',
			phoneNumber: '',
			resultMsg: ''
		}
	},
	created(){
		this.getAnswerContent()
		this.getResult()
	},
	methods: {
		// 获取url参数
		getAnswerContent(){
			let newEligContent = getQueryString('answer')
			this.eligContent = newEligContent
			let newPhoneNumber = getQueryString('phone')
			this.phoneNumber = newPhoneNumber
		},
		// 获取测试结果
		getResult(){
			let eligContent = '54:1|55:2|56:3|57:4|58:1|59:2|60:4|61:2|63:2'
			let phoneNumber = '13840324361'
			let data = {
				username: phoneNumber,
				elig_content: eligContent
			}
			getData('ufx/question/submit', 'post', data).then((res) => {
				console.log(res)
				this.resultMsg = res.invest_risk_tolerance_desc
			})
		},
		// 重新测评跳转
		restart(){
			window.location.href = `${window.location.protocol}//${window.location.host}/riskTest.html?phone=${this.phoneNumber}`
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.invest-sum{
	.invest{
		font-size: $font-size-l;
		.result-title{
			margin-top: 20px;
		}
		.result-img{
			display: block;
			width: 486px;
			height: 366px;
			margin: 80px auto 75px;
		}
		.result-msg{
			font-size: 80px;
			color: $font-color-r;
			margin-bottom: 80px;
			text-align: center;
			font-weight: bold;
			letter-spacing: 10px;
		}
		.result-info{
			text-align: center;
			span{
				padding-left: 26px;
				color: $font-color-r;
			}
		}
		.complete{
			margin-top: 110px;
			color: $color-white;
			font-size: $font-size-title;
			width: 100%;
			height: 80px;
			line-height: 80px;
			text-align: center;
			background-image: url('../common/images/submit.png');
			background-size: 100% 100%;
		}
		.restart{
			text-align: center;
			font-size: $font-size-title;
			color: $font-color-r;
			margin-top: 36px;
		}
		.result-tips{
			margin-top: 36px;
			color: $font-color-s;
			p{
				line-height: 1.8;
			}
		}
	}
}
</style>