<template>
	<view class="main_">
		<slot></slot>
		<view v-if="selectedList.length>0">
			<view class="content" v-for="(item,_id) in currentlist" :key="_id">
				<view class="content_left">
					<view :class='[item.tagName,{income:"+"===item.type?true:false}]' class="content_icon"></view>
					<view class="content_text">{{item.tag}}</view>
				</view>
				<u-line-progress :show-percent="false" :height='14' class="line_progress" :active-color="line_color" :percent="countPercent(item)"></u-line-progress>
				<view class="amount">￥{{amount(item)}}</view>
			</view>
		</view>
		<view class="noList" v-else>
			<u-empty text="目前没有相关记录"></u-empty>
		</view>
		<u-line color="#E6E6E6" length='90%' margin='60rpx auto 0' />
	</view>
</template>

<script>
	export default {
		props: {
			selectedType: '',
			currentlist: {
				type: Array
			},
			selectedList: {
				type: Array
			},
			currentAmount: {
				default: 0
			},
			amount_income: {
				default: 0
			}
		},
		data() {
			return {};
		},
		computed: {
			line_color() {
				return this.selectedType === '-' ? '#3EB575' : '#f0ad4e'
			}
		},
		methods: {
			amount(item){
				const num=item.amount.toFixed(2)
				return item.amount > 9999 ? (Math.floor(num/1000)/10).toFixed(2) + '万' : num
			},
			countPercent(item) {
				return parseInt(item.amount / this.currentAmount * 100)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main_{
		padding-bottom: 10px;
	}
	.content {
		height: 30px;
		display: flex;
		margin-bottom: 12px;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 48rpx 24rpx 48rpx;

		.content_left {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-right: 10rpx;
			width: 26vw;

			.content_icon {
				color: $main-color;
				font-size: 48rpx;
				margin-right: 24rpx;

				&.income {
					color: $uni-color-warning;
				}
			}

			.content_text {
				color: #333333;
				font-size: 26rpx;
				line-height: 30px;
			}
		}

		.line_progress {
			@extend %df;
			flex-shrink: 0;
			flex-grow: 1;
			margin-right: 20rpx;
		}
		.amount{
			width: 18vw;
			margin-left: 8rpx;
			display: flex;
			justify-content: flex-end;
		}
	}
	.noList{
		margin-top: 40rpx;
	}
</style>
