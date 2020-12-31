<template>
	<view class="contentWrapper">
		<view class="top">
			<text class="month">{{nowmonth}}</text>
			<text class="span-line">|</text>
			<picker class="icon_" mode="date" :value="nowmonth" fields="month" @change="bindDateChange">
				<u-icon size="28" name="calendar"></u-icon>
			</picker>
		</view>
		<view class="text_wrapper">
			<text>共支出</text>
			<text v-if="hasrecordlist" class="amount_text">￥{{amount.toFixed(2)}}</text>
			<text class="ls_text">共收入￥</text>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	export default {
		data() {
			return {
				nowmonth: dayjs().format('YYYY年MM月'),
				amount: {
					type: Number
				},
				recordlist: [],
				hasrecordlist: false,
				currentlist: []
			};
		},
		created() {
			this.fetchList().then(() => {
				this.hasrecordlist = true
				this.fetchSelectedList(this.nowmonth)
			})
		},
		methods: {
			bindDateChange(e) {
				const selectedMonth = e.detail.value
				this.nowmonth = dayjs(selectedMonth).format('YYYY年MM月')
				this.fetchSelectedList(this.nowmonth)
			},
			async fetchList() {
				const db = uniCloud.database();
				let res = await db.collection('recordList').where('uid==$env.uid').field('amount,tag,time').get()
				this.recordlist = res.result.data
			},
			fetchSelectedList(value) {
				this.amount = 0
				const list = this.recordlist
				for (let i = 0; i < list.length; i++) {
					const time = dayjs(list[i].time).format('YYYY年MM月')
					if (time === value) {
						this.currentlist.push(list[i])
						this.amount += list[i].amount
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
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

		.top {
			@extend %df;
			width: 32%;
			margin: 0 auto;
			background-color: #F7F7F7;
			border-radius: 4px;
			padding: 7px 10px;
			font-size: 12px;

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
			font-size: 12px;
			color: $main-color;
			@extend %df;
			margin: 25px auto;
			flex-direction: column;
			text-align: center;

			.amount_text {
				font-weight: 500;
				font-size: 18px;
				margin: 13px auto;
			}

			.ls_text {
				font-weight: 400;
				color: #666666;
			}
		}
	}
</style>
