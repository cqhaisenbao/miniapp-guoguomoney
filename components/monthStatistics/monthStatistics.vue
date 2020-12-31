<template>
	<view class="contentWrapper">
		<view class="top">
			<text>{{nowmonth}}</text>
			<text class="span-line">|</text>
			<picker mode="date" :value="nowmonth" fields="month" @change="bindDateChange">
				<u-icon class="icon_" name="calendar"></u-icon>
			</picker>
		</view>
		<view class="text_wrapper">
			<view>共支出</view>
			<view v-if="hasrecordlist">￥{{amount.toFixed(2)}}</view>
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

		.top {
			@extend %df;
			background-color: #F7F7F7;
			border-radius: 3px;
			padding: 7px 10px;

			.icon_ {
				margin-left: 5px;
			}
		}
	}
</style>
