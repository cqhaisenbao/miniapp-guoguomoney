<template>
	<view v-show="show">
		<van-dialog id="van-dialog" />
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
			<u-popup v-model="popshow" mode="bottom" border-radius="14" height="auto">
				<popeditrecord :currentrecord="currentRecord" />
			</u-popup>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				recordid: '',
				currentRecord: {},
				show: false,
				popshow: false,
				time: '',
			}
		},
		onLoad(option) {
			this.recordid = option.recordid
			this.fetchCurrentRecord()
		},
		methods: {
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
				this.$dialog.confirm({
					title: '删除记录',
					message: '请确认是否删除该条记录',
				}).then(() => {
					const db = uniCloud.database();
					db.collection('recordList').doc(this.recordid).remove().then(() => {
						this.$store.commit('recordListChange');
						uni.navigateBack()
					})
				}).catch(() => {
					return
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	%df {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.icon_ {
		margin-right: 5px;
	}

	.content {
		@extend %df;
		flex-direction: column;
		margin: 10px;
		background: #FBFBFB;
		border-radius: 15px;
		padding: 20px 10px 0;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

		.line-1 {
			@extend %df;

			.recordIcon {
				font-size: 20px;
				color: #2b2e4a;
				margin-right: 5px;
				@extend %df;
			}

			.text_ {
				font-size: 16px;
				font-weight: 400;
			}
		}

		.money {
			@extend %df;
			font-size: 30px;
			font-weight: 600;
			margin-top: 10px;
		}

		.createdAt {
			margin-top: 20px;
			font-size: 14px;
			color: #666666;
		}

		.footer_ {
			margin-top: 10px;
			padding: 17px;
			border-top: 1px solid #f2f2f2;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;

			span {
				font-size: 18px;

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
					width: 23px;
					height: 23px;
					padding-right: 8px;
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
