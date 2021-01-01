<template>
	<view class="content">
		<view class="top">
			<u-icon @click="close" name="close" size="30" color="#bfbdbd"></u-icon>
			<text class="text_">请填写类别名</text>
			<text class="text_ok" :class="{isinputed:isinputed}" @click="savetag">确定</text>
		</view>
		<view class="input_">
			<input @input="taginput" v-model="userTag.title" maxlength="4" class="input_text" cursor-spacing='50px' placeholder="不能与已有类型名重复" />
			<u-line color="#d4d3d3" hair-line="false" />
			<view v-if="isrepeat" class="isrepeat">该分类已存在</view>
			<view v-else class="cursor_">{{cursor}}/4</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		props: {
			tagtype: {
				type: String
			},
		},
		data() {
			return {
				isinputed: false,
				cursor: 0,
				isrepeat: false
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
						this.$store.commit('fetchIconName')
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

			.isrepeat {
				margin-top: 10px;
				margin-bottom: 10px;
				font-size: 12px;
				color: #e84545;
			}
		}
	}
</style>
