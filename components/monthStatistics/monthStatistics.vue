<template>
	<view v-if="hasrecordlist" class="contentWrapper">
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
	import dayjs from 'dayjs'
	import { mapState, mapMutations, mapActions } from 'vuex';
	export default {
		data() {
			return {
				params: {
					year: true,
					month: true,
					day: false,
				},
				show: false,
				nowmonth: dayjs().format('YYYY年MM月'),
				amount_pay:0,
				amount_income:0,
				hasrecordlist: false,
				currentlist: []
			};
		},
		watch: {
			recordList() {
				this.hasrecordlist = true
				this.selectedListAmount(this.nowmonth,'-')
			}
		},
		computed: {
			...mapState(['recordList']),
		},
		created() {
			if (this.recordList) {
				this.hasrecordlist = true
				this.selectedListAmount(this.nowmonth, '-')
			}
		},
		methods: {
			dateChange(value) {
				this.nowmonth = value.year + "年" + value.month + "月"
				this.selectedListAmount(this.nowmonth, '-')
			},
			selectedListAmount(value, type) {
				this.amount_pay = 0
				this.amount_income=0
				const list = this.recordList
				for (let i = 0; i < list.length; i++) {
					const time = dayjs(list[i].time).format('YYYY年MM月')
					const currentType = list[i].type
					if (time === value && currentType === type) {
						this.currentlist.push(list[i])
						this.amount_pay += list[i].amount
					}else if(time === value && currentType !== type){
						this.amount_income += list[i].amount
					}
				}
			}
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
