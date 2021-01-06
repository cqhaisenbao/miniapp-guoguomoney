<template>
	<view>
		<view class="title">{{month}}{{type==='-'?'支出':'收入'}}排行</view>
		<view v-if="moneySortList.length>0">
			<view  class="content_" v-for="(item,index) in moneySortList" :key="index" @click="editRecord(item)">
				<view class="num">{{index+1}}</view>
				<icon :class='[item.tagName,{typePayIcon:item.type===`-`?true:false}]' class="icon_" />
				<view>{{ item.tag }}</view>
				<view class="right_wrapper">
					<view class="money">{{ item.type + ' ' +item.amount.toFixed(2) }}</view>
					<view class="time">{{item._time}}</view>
				</view>
				<view>
					<u-icon color='#808080' name="arrow-right"></u-icon>
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
		methods:{
			editRecord(item) {
				this.$u.route('pages/editrecord/editrecord', {
					recordid: item._id,
				})
			},
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
		padding-left: 44rpx;
		margin-bottom: 20rpx;
		font-size: 24rpx;
		color: $uni-text-color-placeholder;
	}

	.content_ {
		padding: 48rpx 48rpx 6rpx 48rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		&:last-child {
			padding-bottom: 50rpx;
		}

		.num {
			width: 40rpx;
			margin-right: 20rpx;
			font-size: 28rpx;
			color: #666666;
		}

		.icon_ {
			width: 80rpx;
			color: $uni-color-warning;
			margin-right: 12rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 64rpx;

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
			margin-right: 20rpx;

			.money {
				font-size: 32rpx;
				color: #333333;
				font-weight: 500;
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
