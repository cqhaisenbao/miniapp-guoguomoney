<template>
	<view>
		<view class="title">{{month}}{{type==='-'?'支出':'收入'}}排行</view>
		<view v-if="moneySortList.length>0">
			<view class="content_" v-for="(item,index) in moneySortList" :key="index">
				<view class="num">{{index+1}}</view>
				<icon :class='[item.tagName,{typePayIcon:item.type===`-`?true:false}]' class="icon_" />
				<view>{{ item.tag }}</view>
				<view class="right_wrapper">
					<view class="money">{{ item.type + ' ' +item.amount.toFixed(2) }}</view>
					<view class="time">{{item._time}}</view>
				</view>
			</view>
		</view>
		<view v-else class="noResult">
			<u-empty text="目前没有相关记录"></u-empty>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import clone from '@/lib/clone';
	export default {
		props: {
			type: '',
			nowmonth: '',
			currentList: {
				type: Array
			}
		},
		data() {
			return {}
		},
		methods: {},
		mounted() {
			console.log(this.currentList)
		},
		computed: {
			month() {
				return this.nowmonth.slice(5) === '10月' ? '10月' : this.nowmonth.slice(5).replace('0', '')
			},
			moneySortList() {
				const { currentList } = this;
				if (currentList.length === 0) { return []; }
				const newList = clone(currentList)
					.filter(r => r.type === this.type)
					.sort((a, b) => b.amount - a.amount);
				if (newList.length === 0) { return [] }
				return newList;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		padding-left: 24rpx;
		font-size: 24rpx;
		color: $uni-text-color-placeholder;
	}

	.content_ {
		padding: 70rpx 48rpx 50rpx 34rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.num {
			margin-right: 20rpx;
			font-size: 28rpx;
			color: #666666;
		}

		.icon_ {
			width: 40px;
			color: $uni-color-warning;
			margin-right: 6px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32px;

			&.typePayIcon {
				color: $main-color
			}
		}

		.right_wrapper {
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: flex-end;

			.money {
				font-size: 32rpx;
				color: #333333;
			}

			.time {
				font-size: 24rpx;
				color: $uni-text-color-placeholder;
			}
		}
	}

	.noResult {
		margin-top: 60rpx;
		text-align: center;
	}
</style>
