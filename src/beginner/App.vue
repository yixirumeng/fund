<template>
	<div>
		<div class="beginner-bg">
			<img :src="beginner1">
			<img :src="beginner2">
			<img :src="beginner3">
			<img :src="beginner4">
			<img :src="beginner5">
			<img :src="beginner6">
			<img :src="beginner7">
		</div>
		<div class="beginner-middle">
			<div class="fund-mean">
				<h4>什么是基金</h4>
				<p>通过发售基金份额，将众多投资者的资金汇集起来，形成独立财产，委托基金管理人进行投资管理，基金托管人进行财产托管，由基金投资人共享投资收益，共担投资风险的集合投资方式。</p>
			</div>
			<div class="fund-advantage">
				<h4>基金有哪些优点</h4>
				<ul class="clearfix">
					<li>
						<img :src="advantage1">
						<p>基金经理管理</p>
						<p>更专注更专业</p>
					</li>
					<li>
						<img :src="advantage2">
						<p>组合投资</p>
						<p>有效分散风险</p>
					</li>
					<li>
						<img :src="advantage3">
						<p>流动性强</p>
						<p>买卖和变现较灵活</p>
					</li>
				</ul>
				<ul class="clearfix">
					<li>
						<img :src="advantage4">
						<p>严格监管</p>
						<p>投资者利益有保障</p>
					</li>
					<li>
						<img :src="advantage5">
						<p>信息透明</p>
						<p>信息披露充分</p>
					</li>
					<li>
						<img :src="advantage6">
						<p>独立托管</p>
						<p>保障资金安全</p>
					</li>
				</ul>
			</div>
			<div class="fund-reason">
				<h4>为什么买基金</h4>
				<p>近十三年投资股票基金，稳稳跑赢A股大盘指数。理财就是这么简单，交给专业的基金公司替您投资，省心省力。</p>
				<img :src="reason">
				<p>数据来源：恒生聚源</p>
			</div>
			<div class="fund-cost">
				<h4>购买基金有哪些费用</h4>
				<ul class="clearfix">
					<li>
						<img :src="cost">
					</li>
					<li>
						基金交易的手续费主要是<span class="content-tips">申购费</span>和<span class="content-tips">赎回费</span>。
					</li>
				</ul>
				<div class="content-tips">申购费</div>
				<p>申购费就是申购（买入）基金时会扣除的费用。申购手续费以1.5%居多，而金基窝上热销基金申购费1折起，省钱就是赚。</p>
				<p>例如：申购费打1折，买入金额3000元，扣除0.15%的申购手续费，实际确认金额是2995.51元</p>
				<div class="content-tips">赎回费</div>
				<p>赎回就是赎回（卖出）基金时需要支付的手续费赎回费要根据你卖出时的净值，和你卖出的份额来计算。赎回费=卖出份额×确认时的净值×赎回费率。</p>
				<p>例如：某只基金赎回费是0.5%，卖出份额是10000份，确认净值是1.2151。</p>
				<p>则赎回手续费=0.5%×10000×1.2151=60.76元</p>
			</div>
			<div class="fund-risk">
				<h4>基金投资有风险吗</h4>
				<div>
					<p>任何一种投资都存在风险，基金也不例外基金公司代投资者管理资产的同时，并不承担投资损失风险。基金成立后，最终将投资各类证券。因此市场宏观环境、行业发展前景、上市公司的估值水平、公司的竞争力等因素，都会使基金投资不可避免地面临一定风险从而产生盈亏的可能。</p>
					<p>一般来说，不同种类基金的风险不一样，股票型>混合型>债券型>货币型。像股票型基金、混合型基金，大部分基金资产都投资到股票市场，所以基金的净值涨跌也会与大盘波动相关。虽然存在风险，但基金有专业理财、分散投资的特质，风险已被控制在一定限度内。加上我国对基金的严格监管，投资者权益还是能得到充分保障。</p>
				</div>
			</div>
			<div class="fund-intro">
				<p>基金是非常适合投资新手的理财方式</p>
				<p class="content-tips">现在就开启财富之旅吧！</p>
			</div>
			<img :src="gift" class="gift">
			<div class="buy" @click="closePage">
				赶紧去购买
			</div>
		</div>
		
	</div>
</template>

<script>
import beginner1 from '@/common/images/beginner/1.jpg'
import beginner2 from '@/common/images/beginner/2.jpg'
import beginner3 from '@/common/images/beginner/3.jpg'
import beginner4 from '@/common/images/beginner/4.jpg'
import beginner5 from '@/common/images/beginner/5.jpg'
import beginner6 from '@/common/images/beginner/6.jpg'
import beginner7 from '@/common/images/beginner/7.jpg'
import advantage1 from '@/common/images/beginner/advantage1.png'
import advantage2 from '@/common/images/beginner/advantage2.png'
import advantage3 from '@/common/images/beginner/advantage3.png'
import advantage4 from '@/common/images/beginner/advantage4.png'
import advantage5 from '@/common/images/beginner/advantage5.png'
import advantage6 from '@/common/images/beginner/advantage6.png'
import reason from '@/common/images/beginner/reason.png'
import cost from '@/common/images/beginner/cost.png'
import gift from '@/common/images/beginner/gift.png'
import {callAppType} from '@/common/js/api'

export default {
	data(){
		return {
			beginner1,
			beginner2,
			beginner3,
			beginner4,
			beginner5,
			beginner6,
			beginner7,
			advantage1,
			advantage2,
			advantage3,
			advantage4,
			advantage5,
			advantage6,
			reason,
			cost,
			gift
		}
	},
	methods: {
		closePage(){
			callAppType('0', '', '关闭页面')
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixin.scss';

.beginner-bg{
	position: absolute;
	top: 0;
	z-index: -1;
	img{
		display: block;
		width: 100%;
	}
}

.beginner-middle{
	margin: 0 30px;
	color: $color-white;
	font-size: $font-size-ll;
	.content-tips{
		color: #ffe23f;
	}
	.fund-mean{
		margin-top: 570px;
		h4{
			@include title-bg(339px, '../common/images/beginner/title1');
		}
		p{
			padding: 25px 35px;
			background-color: $color-white;
			color: #5488fe;
			text-indent: 2em;
			line-height: 1.4;
			border-radius: 8px;
			margin-top: 30px;
		}
	}
	.fund-advantage{
		margin-top: 70px;
		h4{
			@include title-bg(432px, '../common/images/beginner/title2');
		}
		ul{
			margin-top: 80px;
			li{
				float: left;
				min-width: 220px;
				margin-right: 10px;
				text-align: center;
				&:last-child{
					margin-right: 0;
				}
				img{
					display: block;
					width: 136px;
					height: 109px;
					margin: 0 auto;
				}
				img + p{
					margin-top: 15px;
				}
				img + p + p{
					font-size: $font-size-n;
					margin-top: 15px;
				}
			}
		}
	}
	.fund-reason{
		margin-top: 110px;
		h4{
			@include title-bg(412px, '../common/images/beginner/title3');
		}
		h4 + p{
			line-height: 1.5;
			margin-top: 40px;
			letter-spacing: 2px;
			text-align: justify;
		}
		img{
			display: block;
			width: 690px;
			margin-top: 15px;
		}
		img + p{
			font-size: 18px;
			text-align: right;
			margin-top: 10px;
		}
	}
	.fund-cost{
		margin-top: 45px;
		h4{
			@include title-bg(515px, '../common/images/beginner/title4');
		}
		ul{
			margin-top: 40px;
			li{
				&:first-child{
					float: left;
				}
				&:last-child{
					float:right;
					width: 420px;
					line-height: 1.5;
					letter-spacing: 2px;
					margin-top: 70px;
				}
				img{
					display: block;
					width: 133px;
					height: 188px;
					margin-left: 80px;
					margin-right: 55px;
				}
			}
		}
		div{
			font-size: 36px;
			margin: 40px 0 25px;
		}
		p{
			line-height: 1.6;
		}
	}
	.fund-risk{
		margin-top: 60px;
		h4{
			@include title-bg(515px, '../common/images/beginner/title4');
		}
		div{
			margin-top: 40px;
			padding: 35px;
			background-color: $color-white;
			border-radius: 10px;
			p{
				text-indent: 2em;
				line-height: 1.8;
				color: #5488fe;
			}
		}
	}
	.fund-intro{
		text-align: center;
		p:first-child{
			margin-top: 35px;
		}
		p:last-child{
			margin-top: 15px;
			font-size: 36px;
		}
	}
	.gift{
		display: block;
		width: 100%;
		margin-top: 50px;
	}
	.buy{
		width: 100%;
		height: 90px;
		background-image: url("../common/images/beginner/buy.png");
		background-size: contain;
		font-size: 34px;
		text-align: center;
		line-height: 90px;
		letter-spacing: 4px;
		margin-top: 20px;
	}
}

</style>

