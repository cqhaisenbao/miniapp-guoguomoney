<template>
	<view class="content">
		<van-toast id="van-toast" />
		<view class="top">
			<u-icon name="arrow-left" size="40" color="#bfbdbd"></u-icon>
			<text class="text_">请填写类别名</text>
			<text class="text_ok" :class="{isinputed:isinputed}" @click="savetag">确定</text>
		</view>
		<view class="input_">
			{{userTag.title}}
			<input @input="taginput" v-model="userTag.title" maxlength="4" class="input_text" cursor-spacing='50px' placeholder="不能与已有类型名重复" />
			<u-line color="#d4d3d3" hair-line="false" />
			<view class="cursor_">{{cursor}}/4</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tagtype: {
				type: String
			}
		},
		data() {
			return {
				isinputed: false,
				cursor: 0
			};
		},
		watch: {
			cursor() {
				this.cursor > 0 ? this.isinputed = true : this.isinputed = false
			},
		},
		computed: {
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
			savetag() {
				this.userTag.type === this.tagtype
				uni.showLoading({ title: '加载中' });
				const db = uniCloud.database();
				db.collection('income').add(this.userTag).then((res) => {
					this.$emit("savetag")
					uni.hideLoading()
					this.$toast.success('新建成功')
				}).catch(err => console.log(err));
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
			margin: 15px 16px;
			font-weight: 500;

			.text_ok {
				font-size: 16px;
				color: lighten($main-color, 30%);

				&.isinputed {
					color: $main-color;
				}
			}
		}

		.input_ {
			margin: 16px 16px 10px;
			font-size: 15px;

			.input_text {
				margin-bottom: 10px;
			}

			.cursor_ {
				margin-top: 10px;
				margin-bottom: 10px;
				font-size: 12px;
				color: #d4d3d3
			}
		}
	}
</style>
