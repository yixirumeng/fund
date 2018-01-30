<template>
	<div class="invest-sum">
		<div class="invest">
			<div class="question-sum">
				<div class="question-number clearfix">
					<span>{{currentNumber}}</span><span>/</span><span>{{totalNumber}}</span>
				</div>
				<div class="question-sum" v-for="(item, index) in questionList" :key="index" v-show="currentNumber === index+1">
					<div class="question-title" >
						{{item.question_content}}
					</div>
					<ul>
						<li :class="{on: optionColorArr[index] === itemSection.option_no, on1: currentIndex === indexSection}" v-for="(itemSection, indexSection) in item.section" :key="indexSection" @click="collectPoint(index, itemSection.question_no, itemSection.option_no, indexSection)">
							{{itemSection.option_content}}
						</li>
					</ul>
					<div class="option-btn">
						<span v-show="currentNumber !== 1" @click="prev">上一题</span><span v-show="currentNumber !== totalNumber" @click="next(index)">下一题</span>
					</div>
					<div class="question-error">
						<div class="error-msg" v-show="error">
							{{errorMsg}}
						</div>
					</div>
					<div class="submit-btn" v-show="currentNumber === totalNumber" @click="answerSubmit">
						提交
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {getData} from '@/common/js/api'

export default {
	data(){
		return {
			currentNumber: 1,
			totalNumber: null,
			questionContent: '',
			questionList: null,
			optionColorArr: [],
			currentIndex: -1,
			answerArr: [],
			error: false,
			errorMsg: ''
		}
	},
	created(){
		this.getQuestion()
	},
	methods: {
		// 获取题目信息
		getQuestion(){
			getData('ufx/question/list', 'post').then((res) => {
				console.log(res)
				this.totalNumber = res.length
				this.questionList = res
			})
		},
		// 得到答题结果并格式化
		collectPoint(index, questionNo, optionNo, indexSection){
			this.currentIndex = indexSection
			this.optionColorArr[index] = optionNo
			let answerContent = `${questionNo}:${optionNo}`
			this.answerArr[index] = answerContent
			this.error = false
			this.errorMsg = ''
		},
		// 提交按钮事件，提交后页面跳转，错误信息提示
		answerSubmit(){
			if(this.answerArr.length !== this.totalNumber){
				this.error = true
				this.errorMsg = '您还有尚未作答的题目，请作答后再提交'
			}else{
				for(let i=0; i<this.answerArr.length; i++){
					if(typeof(this.answerArr[i]) === 'undefined'){
						this.error = true
						this.errorMsg = '您还有尚未作答的题目，请作答后再提交'
						return false
					}
					i === this.answerArr.length-1 ? this.answer += `${this.answerArr[i]}` : this.answer += `${this.answerArr[i]}|`
				}
				window.location.href = `${window.location.protocol}//${window.location.host}/riskTestResult.html?answer=${this.answer}&phone=13840324361`
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
				this.errorMsg = '您还没有作答，请选择答案后再进行下一题'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.invest-sum{
	.invest{
		.question-sum{
			margin-left: 20px;
			.question-number{
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
			.question-sum{
				ul{
					margin-top: 100px;
					li{
						padding: 50px 0;
						border-bottom: 1px solid $border-color;
						font-size: $font-size-title;
						color: $font-color-d;
						line-height: 1.5;
						&:first-child{
							border-top: 1px solid $border-color;
						}
						&.on{
							background-color: rgba(254, 54, 80, .05);
						}
						&.on1{
							background-color: rgba(254, 54, 80, .05);
						}
					}
				}
			}
			.question-title{
				margin-top: 45px;
				color: $font-color-r;
				font-size: 40px;
				line-height: 1.5;
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
			.question-error{
				font-size: $font-size-n;
				color: $font-color-r;
				text-align: center;
				margin-top: 30px;
				height: 28px;
			}
			.submit-btn{
				display: block;
				margin-top: 80px;
				color: $color-white;
				width: 100%;
				height: 80px;
				line-height: 80px;
				text-align: center;
				background-image: url('../common/images/submit.png');
				background-size: 100% 100%;
			}
		}
	}
}
</style>