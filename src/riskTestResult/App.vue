<template>
	<div class="invest-sum">
		<div class="invest">
			<div class="result-title">您的风险等级：</div>
			<img :src="riskResult" alt="风险测评结果" class="result-img">
			<div class="result-msg">
				{{resultMsg}}
			</div>
			<div class="result-info">建议选择基金<span>{{riskType}}</span></div>
			<div class="result-info" v-show="!firstTest">上次测评日期<span>{{overdue}}</span></div>
			<a class="complete" :href="newJumpUrl" v-show="firstTest">开始测评</a>
			<div class="complete" @click="closePage" v-show="!firstTest">完成</div>
			<div class="restart" v-show="!firstTest">
				<a :href="newJumpUrl">重新测评</a>
			</div>
			<div class="result-tips">
				<p class="risk-explain" @click="callTestExplain">《风险测评说明》</p>
				<p>重要提示：</p>
				<p>以上信息仅供投资者参考，不作为投资者决策的依据。</p>
			</div>
		</div>
	</div>
</template>

<script>
import riskResult from '@/common/images/riskResult.png'
import {getData, getQueryString, callAppType, depositPath, getNewUrl} from '@/common/js/api'

export default {
	data(){
		return {
			riskResult,
			phoneNumber: '',
			resultMsg: '',
			riskType: '',
			overdue: '',
			firstTest: true,
			testUrl: '',
			token: ''
		}
	},
	created(){
		this.getAnswerContent()
	},
	computed: {
		newJumpUrl(){
			return getNewUrl(`${depositPath}riskTest.html?token=${this.token}&phone=${this.phoneNumber}`)
		}
	},
	methods: {
		// 获取url参数，并对参数进行判断
		getAnswerContent(){
			this.token = getQueryString('token')
			this.phoneNumber = getQueryString('phone')
			let newEligContent = getQueryString('answer')
			let type = getQueryString('type')
			if(newEligContent !== null && type === null){
				let data = {
					username: this.phoneNumber,
					elig_content: newEligContent
				}
				getData('ufx/question/submit', 'post', data, this.token).then((res) => {
					this.resultMsg = res.invest_risk_tolerance_desc
					this.riskType = res.ofund_risklevel_desc
					this.overdue = res.submit_date
					this.firstTest = false
				})
			}else if(newEligContent === null && type === null){
				this.resultMsg = '尚未测评'
				this.riskType = '---'
				this.firstTest = true
			}else if(newEligContent === null && type !== null){
				this.resultMsg = decodeURIComponent(type)
				this.riskType =  decodeURIComponent(getQueryString('risk'))
				this.overdue = getQueryString('date')
				this.firstTest = false
			}
		},
		// 重新测评按钮点击跳转
		callRiskTest(){
			callAppType('1', `${depositPath}riskTest.html?token=${this.token}&phone=${this.phoneNumber}`, '风险测评')
		},
		// 点击完成，关闭当前页面，跳转原生app
		closePage(){
			callAppType('0', '', '关闭页面')
		},
		// 点击风险测评说明跳转
		callTestExplain(){
			callAppType('1', `${depositPath}riskExplain.html`, '风险测评')
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.invest-sum{
	.invest{
		font-size: $font-size-l;
		padding-top: 55px;
		.result-img{
			display: block;
			width: 409px;
			height: 308px;
			margin: 40px auto 75px;
		}
		.result-msg{
			font-size: 80px;
			color: $font-color-r;
			margin-bottom: 55px;
			text-align: center;
			font-weight: 600;
			letter-spacing: 10px;
		}
		.result-info{
			text-align: center;
			margin-bottom: 35px;
			span{
				padding-left: 26px;
				color: $font-color-r;
			}
		}
		.complete{
			display: block;
			margin-top: 55px;
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
			a{
				color: $font-color-r;
				&:active{
					color: $font-color-r;
				}
			}
		}
		.result-tips{
			margin-top: 45px;
			color: $font-color-s;
			p{
				line-height: 1.8;
				&.risk-explain{
					color: $font-color-r;
					margin-bottom: 20px;
				}
			}
		}
	}
}
</style>