<template>
	<view v-show="show">
		<view class="content">
			<view class="line-1">
				<icon class="recordIcon" :class="currentRecord.tagName" />
				<text class="text_">{{ currentRecord.tag }}</text>
			</view>
			<view v-if="currentRecord.amount" class="money">{{ currentRecord.type + ' ' +currentRecord.amount.toFixed(2) }}</view>
			<view class="createdAt">
				<span>记录时间：</span>
				<span>{{ time }}</span>
			</view>
			<view class="footer_">
				<span class="footer_span" @click="remove">
					<u-icon class="icon_" name="trash" color="red" size="35"></u-icon>删除
				</span>
				<span class="span-line">|</span>
				<span class="footer_span" @click="popshow = true">
					<u-icon class="icon_" name="edit-pen" color="#666666" size="35"></u-icon>编辑
				</span>
			</view>
		</view>
		<view>
			<u-popup  v-model="popshow" mode="bottom" border-radius="14" height="auto" safe-area-inset-bottom=true closeable=true>
				<popeditrecord :popshow="popshow" @updated="updated" :currentrecord="currentRecord" />
			</u-popup>
		</view>
		<u-modal confirm-color="#3EB575" @confirm="confirm" show-cancel-button="true" v-model="deletetagshow" :content="content"></u-modal>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import { mapState, mapMutations, mapActions } from 'vuex';
	export default {
		data() {
			return {
				recordid: '',
				currentRecord: {},
				show: false,
				popshow: false,
				deletetagshow: false,
				time: '',
				content: '请确认是否删除该条记录'
			}
		},
		onLoad(option) {
			this.recordid = option.recordid
			this.fetchCurrentRecord()
		},
		methods: {
			...mapActions(['fetchRecordList']),
			updated(value) {
				this.popshow = value
				setTimeout(()=>{
				uni.showToast({
					title: '修改成功',
					icon: 'none',
				});	
				},0)
				this.fetchCurrentRecord()
			},
			fetchCurrentRecord() {
				const db = uniCloud.database();
				db.collection('recordList').where({
					_id: this.recordid
				}).get().then(res => {
					this.currentRecord = res.result.data[0]
					this.time = dayjs(this.currentRecord.time).format('YYYY年MM月DD日');
					this.show = true
				})
			},
			remove() {
				this.deletetagshow = true
			},
			confirm() {
				const db = uniCloud.database();
				db.collection('recordList').doc(this.recordid).remove().then(() => {
					this.$store.dispatch('fetchRecordList')
					uni.navigateBack()
					setTimeout(()=>{
					uni.showToast({
						title: '删除成功',
						icon: 'none',
					});	
					},0)
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	%df {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.icon_ {
		margin-right: 10rpx;
	}

	.content {
		@extend %df;
		flex-direction: column;
		margin: 20rpx;
		background: #FBFBFB;
		border-radius: 30rpx;
		padding: 40rpx 20rpx 0;
		box-shadow: 0 4rpx 24rpx 0 rgba(0, 0, 0, 0.1);

		.line-1 {
			@extend %df;

			.recordIcon {
				font-size: 40rpx;
				color: #2b2e4a;
				margin-right: 10rpx;
				@extend %df;
			}

			.text_ {
				font-size: 32rpx;
				font-weight: 400;
			}
		}

		.money {
			@extend %df;
			font-size: 60rpx;
			font-weight: 600;
			margin-top: 20rpx;
		}

		.createdAt {
			margin-top: 20rpx;
			font-size: 28rpx;
			color: #666666;
		}

		.footer_ {
			margin-top: 20rpx;
			padding: 34rpx;
			border-top: 1px solid #f2f2f2;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;

			span {
				font-size: 36rpx;

				&.span-line {
					border-right: 1px solid rgba(0, 0, 0, 0.1);
					margin-right: 1px;
					color: rgba(0, 0, 0, 0);
				}

				&:first-child {
					width: 50%;
					@extend %df;
					color: red;
				}

				&:last-child {
					width: 50%;
					@extend %df;
					color: #333333;
				}

				.icon {
					width: 46rpx;
					height: 46rpx;
					padding-right: 16rpx;
				}
			}
		}
	}

	.card {
		border-radius: 4px;
		border: 1px solid #dbdbdb;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	}
</style>
