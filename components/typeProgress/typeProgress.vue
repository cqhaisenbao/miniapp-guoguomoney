<template>
	<view>
		<view v-if="selectedList.length>0">
			<view class="content" v-for="(item,_id) in currentlist" :key="_id">
				<view class="content_left">
					<view :class='[item.tagName,{income:"+"===item.type?true:false}]' class="content_icon"></view>
					<view class="content_text">{{item.tag}}</view>
				</view>
				<u-line-progress :show-percent="false" :height=20 class="line_progress" :active-color="line_color" :percent="countPercent(item)"></u-line-progress>
				<view class="amount">￥{{item.amount.toFixed(2)}}</view>
			</view>
		</view>
		<view class="noList" v-else>
			<u-empty text="目前没有相关记录"></u-empty>
		</view>
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
		margin-bottom: 8px;
		justify-content: space-between;
		align-items: center;
		padding: 20px 24px 10px 12px;

		.content_left {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-right: 5px;
			width: 28vw;

			.content_icon {
				color: $main-color;
				font-size: 24px;
				margin-right: 12px;

				&.income {
					color: $uni-color-warning;
				}
			}

			.content_text {
				color: #777777;
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
		.amount{
			width: 15vw;
			margin-left: 5px;
			display: flex;
			justify-content: flex-end;
		}
	}
	.noList{
		margin-top: 20px;
	}
</style>
