<template>
	<view class="contentWrapper">
		<view class="top">
			<text class="month">{{nowmonth}}</text>
			<text class="span-line">|</text>
			<u-icon class="icon_" @click="show=true" size="38" name="calendar"></u-icon>
			<u-picker mode="time" v-model="show" :params="params" confirm-color="#3EB575" @confirm="dateChange"></u-picker>
		</view>
		<view class="text_wrapper">
			<text>共支出</text>
			<text class="amount_text">￥{{amount_pay.toFixed(2)}}</text>
			<text class="ls_text">共收入￥{{amount_income.toFixed(2)}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			nowmonth: '',
			amount_pay: {
				default: 0
			},
			amount_income: {
				default: 0
			},
		},
		data() {
			return {
				params: {
					year: true,
					month: true,
					day: false,
				},
				show: false,
			};
		},
		methods: {
			dateChange(value) {
				this.$emit('update:nowmonth', value.year + "年" + value.month + "月");
			},
		}
	}
</script>

<style lang="scss" scoped>
	.contentWrapper {
		@extend %df;
		padding-top: 30px;
		flex-direction: column;
		text-align: center;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

		.top {
			@extend %df;
			// width: 32%;
			margin: 0 auto;
			background-color: #F7F7F7;
			border-radius: 4px;
			padding: 7px 10px;
			font-size: 15px;

			.month {
				margin-right: 10px;
				flex-shrink: 0;
			}

			.span-line {
				margin-right: 10px;
				color: #999999;
			}

			.icon_ {
				@extend %df;
				color: #666666;
			}
		}

		;

		.text_wrapper {
			font-size: 14px;
			color: $main-color;
			@extend %df;
			margin: 25px auto;
			flex-direction: column;

			.amount_text {
				font-weight: 500;
				font-size: 28px;
				margin: 13px auto;
			}

			.ls_text {
				font-weight: 400;
				color: #666666;
			}
		}
	}
</style>
