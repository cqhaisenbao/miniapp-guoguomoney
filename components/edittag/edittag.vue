<template>
	<view class="content">
		<view class="top">
			<u-icon @click="close" name="close" size="30" color="#bfbdbd"></u-icon>
			<text class="text_">请填写类别名</text>
			<text class="text_ok" :class="{isinputed:isinputed}" @click="savetag">确定</text>
		</view>
		<view class="input_">
			<input :focus="isFocus" @input="taginput" v-model="userTag.title" maxlength="4" class="input_text" cursor-spacing='50px' placeholder="不能与已有类型名重复" />
			<u-line color="#d4d3d3" hair-line="false" />
			<view v-if="isrepeat" class="isrepeat">该分类已存在</view>
			<view v-else class="cursor_">{{cursor}}/4</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapActions } from 'vuex';
	export default {
		props: {
			tagtype: {
				type: String
			},
			isFocus:{
				type:Boolean
			}
		},
		data() {
			return {
				isinputed: false,
				cursor: 0,
				isrepeat: false,
			};
		},
		watch: {
			cursor() {
				this.cursor > 0 ? this.isinputed = true : this.isinputed = false
			},
		},
		computed: {
			...mapState(['iconName']),
			userTag() {
				return {
					name: 'iconfont icon-zidingyi',
					title: '',
					type: this.tagtype
				}
			},
		},
		methods: {
			taginput(e) {
				this.cursor = e.detail.cursor
			},
			close() {
				this.$emit("close")
			},
			savetag() {
				const list = this.iconName
				const currentName = this.userTag.title
				const currentType = this.userTag.type
				const x = list.every(function(elem) {
					if (elem.title === currentName && elem.type === currentType) {
						return false
					} else {
						return true
					}
				})
				if (x && currentName) {
					this.userTag.type === this.tagtype
					uni.showLoading({ title: '加载中' });
					const db = uniCloud.database();
					db.collection('income').add(this.userTag).then((res) => {
						this.$store.dispatch('fetchIconName')
						this.$emit("savetag", currentName)
						uni.hideLoading()
						uni.showToast({
							title: '新建成功',
							icon: 'success'
						})
					}).catch(err => console.log(err));
				} else {
					this.isrepeat = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 30%;

		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 30rpx 32rpx;
			font-weight: 500;

			.text_ok {
				font-size: 32rpx;
				color: lighten($main-color, 30%);

				&.isinputed {
					color: $main-color;
				}
			}
		}

		.input_ {
			margin: 32rpx 32rpx 0;
			font-size: 30rpx;

			.input_text {
				margin-bottom: 30rpx;
			}

			.cursor_ {
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				font-size: 24rpx;
				color: #d4d3d3
			}

			.isrepeat {
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				font-size: 24rpx;
				color: #e84545;
			}
		}
	}
</style>
