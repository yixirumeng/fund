<template>
	<div class="invest-sum">
		<div class="invest" v-if="totalNumber!==0">
			<div class="question-sum">
				<div class="question-number clearfix">
					<span>{{currentNumber}}</span><span>/</span><span>{{totalNumber}}</span>
				</div>
				<div class="question-details" v-for="(item, index) in questionList" :key="index" v-show="currentNumber === index+1">
					<div class="question-title" >
						{{item.question_content}}
					</div>
					<ul>
						<li :class="{on: optionColorArr[index] == itemSection.option_no}" v-for="(itemSection, indexSection) in item.section" :key="indexSection" @click="collectPoint(index, itemSection.question_no, itemSection.option_no, indexSection)">
							{{itemSection.option_content}}
						</li>
					</ul>
					<div class="option-btn">
						<span v-show="currentNumber !== 1" @click="prev">上一题</span><span v-show="currentNumber !== totalNumber" @click="next(index)">下一题</span>
					</div>
				</div>
			</div>
			<div class="question-error" v-show="error">
				<!-- <div class="error-msg" v-show="error"> -->
					{{errorMsg}}
				<!-- </div> -->
			</div>
			<div class="submit-btn" v-show="currentNumber === totalNumber" @click="callTestResult">
				提交
			</div>
		</div>
		<img :src="loading" alt="加载中" class="loading" v-else>
	</div>
</template>

<script>
import {getData, getQueryString, callAppType, depositPath, getNewUrl} from '@/common/js/api'
import loading from '@/common/images/loading.gif'

export default {
	data(){
		return {
			loading,
			currentNumber: 1,
			totalNumber: 0,
			questionContent: '',
			questionList: null,
			optionColorArr: [],
			currentIndex: -1,
			phone: '',
			token: '',
			answerArr: [],
			answer: '',
			error: false,
			errorMsg: ''
		}
	},
	created(){
		this.getParams()
		this.getQuestion()
	},
	methods: {
		// 获取token、phone参数
		getParams(){
			this.token = getQueryString('token')
			this.phone = getQueryString('phone')
		},
		// 获取题目信息
		getQuestion(){
			getData('ufx/question/list', 'post', '', this.token).then((res) => {
				if(res.code === 1003){
					callAppType('31', `${res.message}`, '')
				}else{
					this.totalNumber = res.length
					this.questionList = res
				}
			})
		},
		// 得到答题结果并格式化
		collectPoint(index, questionNo, optionNo, indexSection){
			this.currentIndex = indexSection
			this.$set(this.optionColorArr, index, optionNo)
			let answerContent = `${questionNo}:${optionNo}`
			this.answerArr[index] = answerContent
			this.error = false
			this.errorMsg = ''
		},
		// 提交按钮事件，提交后页面跳转，错误信息提示
		callTestResult(){
			if(this.answerArr.length !== this.totalNumber){
				this.error = true
				this.errorMsg = '您还没有作答'
				this.errorHide()
			}else{
				for(let i=0; i<this.answerArr.length; i++){
					if(typeof(this.answerArr[i]) === 'undefined'){
						this.error = true
						this.errorMsg = '您还没有作答'
						this.errorHide()
						return false
					}
					i === this.answerArr.length-1 ? this.answer += `${this.answerArr[i]}` : this.answer += `${this.answerArr[i]}|`
				}
				
				// callAppType('1', `${depositPath}riskTestResult.html?phone=${this.phone}&answer=${this.answer}`, '风险测评结果')
				window.location.href = getNewUrl(`riskTestResult.html?token=${this.token}&phone=${this.phone}&answer=${this.answer}`)
			}
		},
		// 上一题按钮事件
		prev(){
			this.currentNumber === 1 ? this.currentNumber = 1 : this.currentNumber -= 1
		},
		// 下一题按钮事件
		next(index){
			if(typeof(this.answerArr[index]) != 'undefined'){
				this.currentNumber === this.totalNumber ? this.currentNumber = this.totalNumber : this.currentNumber += 1
				this.currentIndex = -1
			}else{
				this.error = true
				this.errorMsg = '您还没有作答'
				this.errorHide()
			}
		},
		// 2秒后错误提示消失
		errorHide(){
			if(this.error){
				setTimeout(() => {
					this.error = false
				}, 2000)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
.invest-sum{
	.invest{
		padding-top: 50px;
		.question-sum{
			.question-number{
				padding-left: 20px;
				color: $font-color-s;
				span{
					display: block;
					float: left;
					&:nth-child(1){
						color: $font-color-r;
						font-size: 100px;
						margin-right: 20px;
					}
					&:nth-child(2){
						margin-top: 58px;
						margin-right: 10px;
					}
					&:nth-child(3){
						margin-top: 60px;
					}
				}
			}
			.question-details{
				ul{
					margin-top: 85px;
					li{
						padding: 50px 0 50px 20px;
						border-bottom: 1px solid $invest-table-bg;
						font-size: $font-size-title;
						color: $font-color-d;
						line-height: 1.5;
						position: relative;
						&:first-child{
							border-top: 1px solid $invest-table-bg;
						}
						&.on{
							background-color: rgba(254, 54, 80, .05);
						}
					}
				}
			}
			.question-title{
				margin-top: 30px;
				padding-left: 20px;
				color: $font-color-r;
				font-size: 40px;
				line-height: 1.5;
				font-weight: 600;
			}
			.option-btn{
				margin-top: 30px;
				text-align: center;
				color: $font-color-r;
				font-size: $font-size-title;
				span{
					padding: 0 60px;
				}
			}
		}
		.question-error{
			font-size: $font-size-ll;
			color: $color-white;
			text-align: center;
			background-color: $font-color-n;
			padding: 40px 24px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 5px;
		}
		.submit-btn{
			position: fixed;
			bottom: 0;
			left: 0;
			color: $color-white;
			width: 100%;
			height: 96px;
			line-height: 96px;
			font-size: $font-size-title;
			text-align: center;
			background-image: url('./submit.png');
			background-size: 100% 100%;
		}
	}
}
</style>