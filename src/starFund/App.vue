<template>
	<div>
		<div class="star" v-if="profitType(profit1) && profitType(profit2) && profitType(profit3) && profitType(profit4)">
			<img :src="starFund" alt="明星基金">
			<div class="star-fund">
				<ul>
					<li @click="callDetail1">
						<div>
							<p>中融融安二号</p>
							<p>躁动行情下&nbsp;&nbsp;收益长虹</p>
						</div>
						<div>
							<p>{{profit1}}%</p>
							<p>近六月收益</p>
						</div>
					</li>
					<li @click="callDetail2">
						<div>
							<p>中融新经济C</p>
							<p>均衡配置&nbsp;&nbsp;抗跌首选</p>
						</div>
						<div>
							<p>{{profit2}}%</p>
							<p>近一年收益</p>
						</div>
					</li>
					<li @click="callDetail3">
						<div>
							<p>方正创新动力</p>
							<p>业绩飘红&nbsp;&nbsp;领跑同业</p>
						</div>
						<div>
							<p>{{profit3}}%</p>
							<p>近一月收益</p>
						</div>
					</li>
					<li @click="callDetail4">
						<div>
							<p>中融鑫思路C</p>
							<p>大朗淘金&nbsp;&nbsp;历经考验</p>
						</div>
						<div>
							<p>{{profit4}}%</p>
							<p>近一年收益</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<img :src="loading" alt="加载中" class="loading" v-else>
	</div>
</template>

<script>
import loading from '@/common/images/loading.gif'
import starFund from '@/common/images/starFund1.png'
import {getData, callAppType} from '@/common/js/api'

export default {
	data(){
		return {
			loading,
			starFund,
			fundCode: ['001739', '001388', '730001', '004009'],
			innerCode1: '',
			innerCode2: '',
			innerCode3: '',
			innerCode4: '',
			profit1: '',
			profit2: '',
			profit3: '',
			profit4: ''
		}
	},
	created(){
		this.getProfit()
	},
	methods: {
		getProfit(){
			getData(`fund/${this.fundCode[0]}/inner/code`, 'get').then((res)=>{
				this.innerCode1 = res
				return res
			}).then((res1)=>{
				getData(`fund/${res1}/net/range`, 'get').then((res2)=>{
					this.profit1 = res2.rangeSixMonth
				})
			})
			getData(`fund/${this.fundCode[1]}/inner/code`, 'get').then((res)=>{
				this.innerCode2 = res
				return res
			}).then((res1)=>{
				getData(`fund/${res1}/net/range`, 'get').then((res2)=>{
					this.profit2 = res2.rangeOneYear
				})
			})
			getData(`fund/${this.fundCode[2]}/inner/code`, 'get').then((res)=>{
				this.innerCode3 = res
				return res
			}).then((res1)=>{
				getData(`fund/${res1}/net/range`, 'get').then((res2)=>{
					this.profit3 = res2.rangeOneMonth
				})
			})
			getData(`fund/${this.fundCode[3]}/inner/code`, 'get').then((res)=>{
				this.innerCode4 = res
				return res
			}).then((res1)=>{
				getData(`fund/${res1}/net/range`, 'get').then((res2)=>{
					this.profit4 = res2.rangeOneYear
				})
			})
		},
		callDetail1(){
			callAppType('11', `${this.innerCode1}`, '中融融安二号')
		},
		callDetail2(){
			callAppType('11', `${this.innerCode2}`, '中融新经济C')
		},
		callDetail3(){
			callAppType('11', `${this.innerCode3}`, '方正创新动力')
		},
		callDetail4(){
			callAppType('11', `${this.innerCode4}`, '中融鑫思路C')
		},
		profitType(profit){
			if(parseInt(profit, 10) === 0){
				return true
			}else if(typeof profit !== 'undefined' && profit){
				return true
			}else{
				return false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../common/styles/variables.scss';
.star{
	position: relative;
	img{
		display: block;
		width: 100%;
	}
	.star-fund{
		position: absolute;
		top: 630px;
		width: 100%;
		ul{
			margin: 0 40px;
			li{
				width: 100%;
				margin-bottom: 30px;
				border-radius: 16px;
				background-color: $color-white;
				padding: 45px 30px;
				&::after{
					display: block;
					clear: both;
					content: "";
					visibility: hidden;
				}
				div:first-child{
					float: left;
					p:first-child{
						font-size: $font-size-title;
						color: $font-color-r;
						margin-bottom: 30px;
					}
					p:last-child{
						font-size: $font-size-ll;
						color: $font-color-n;
					}
				}
				div:last-child{
					float: right;
					margin-top: -10px;
					p:first-child{
						font-size: 60px;
						color: $font-color-r;
						margin-bottom: 22px;
						text-align: right;
					}
					p:last-child{
						font-size: 24px;
						color: $font-color-n;
						text-align: right;
					}
				}
			}
		}
	}
}
</style>