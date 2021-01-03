<template>
	<view>
		<view class="content" v-for="(item,_id) in currentlist" :key="_id">
			<view class="content_left">
				<view :class='item.tagName' class="content_icon"></view>
				<view class="content_text">{{item.tag}}</view>
			</view>
			<u-line-progress :show-percent="false" :height=20 class="line_progress" active-color="#3EB575" :percent="countPercent(item)"></u-line-progress>
			<view>￥{{item.amount.toFixed(2)}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			currentlist: {
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
			return {
			};
		},
		methods: {
			countPercent(item) {
				return parseInt(item.amount / this.currentAmount * 100)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 12px;

		.content_left {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-right: 10px;
			width: 30vw;

			.content_icon {
				color: $main-color;
				font-size: 24px;
				margin-right: 12px;
			}

			.content_text {
				color: black;
				font-size: 14px;
				line-height: 30px;
			}
		}

		.line_progress {
			@extend %df;
			flex-shrink: 0;
			flex-grow: 1;
			margin-right: 10px;
		}
	}
</style>
