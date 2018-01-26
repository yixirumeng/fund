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
						<li v-for="(itemSection, indexSection) in item.section" :key="indexSection" @click="collectPoint(this, itemSection.question_no, itemSection.option_score)">
							{{itemSection.option_content}}
						</li>
					</ul>
				</div>
				<div class="option-btn">
					<span v-show="currentNumber !== 1" @click="prev">上一题</span><span v-show="currentNumber !== totalNumber" @click="next">下一题</span>
				</div>
				<div class="submit-btn" v-show="currentNumber === totalNumber">
					提交
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {getData} from '@/common/js/api'
import $ from 'jquery'

export default {
	data(){
		return {
			currentNumber: 1,
			totalNumber: null,
			questionContent: '',
			questionList: null
		}
	},
	created(){
		this.getQuestion()
	},
	methods: {
		getQuestion(){
			getData('ufx/question/list', 'post').then((res) => {
				console.log(res)
				this.totalNumber = res.length
				this.questionList = res
			})
		},
		collectPoint(index, number, score){
			console.log(index)


		},
		prev(){
			this.currentNumber === 1 ? this.currentNumber = 1 : this.currentNumber -= 1
		},
		next(){
			this.currentNumber === this.totalNumber ? this.currentNumber = this.totalNumber : this.currentNumber += 1
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.invest-sum{
	min-height: 1334px;
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
			.submit-btn{
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