<template>
	<view v-if="iconName.length>0" class="tags">
		<van-dialog id="van-dialog" />
		<scroll-view show-scrollbar=false class="icon_wrapper" scroll-x>
			<view class="tags_scroll__box">
				<view v-if="item.default && item.type===type" v-for="(item,index) in iconName" :key="index" :class='[item.name,{selected:selectedTag===item.title?true:false}]' class="icon" @click="toggle(item)">
					<text class="icon_font">{{item.title}}</text>
				</view>
				<view @longpress='editusertag(item)' v-if="!item.default && item.type===type" v-for="(item,index) in iconName" :key="index" :class='[item.name,{selected:selectedTag===item.title?true:false}]' class="icon" @click="toggle(item)">
					<text class="icon_font">{{item.title}}</text>
				</view>
				<view @click="addtag" class="iconfont icon-tianjiazc icon">
					<text class="icon_font">新增分类</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			iconName: {
				type: Array
			},
			type: {
				type: String
			},
			selectedTag: '',
			tagName: '',
			popshow: false,
		},
		data() {
			return {
				selectedTags: [],
				condition1: true,
			};
		},
		methods: {
			toggle(item) {
				const length = this.selectedTags.length;
				if (length > 0) {
					this.selectedTags.pop();
				}
				this.selectedTags.push(item.title);
				this.$emit('update:selectedTag', item.title);
				this.$emit('update:TagName', item.name);
			},
			addtag() {
				this.$emit('update:popshow', true);
			},
			editusertag(item) {
				const tagid = item._id
				this.$dialog.confirm({
					title: '删除标签',
					message: '请确认是否删除此标签',
				}).then(() => {
					const db = uniCloud.database();
					db.collection('income').doc(tagid).remove().then((res) => {
						this.$emit('deletetag')
					})
				}).catch(() => {
					return
				})
			}
		}
	}
</script>

<style lang="scss">
	.tags {
		width: 100%;
		box-sizing: border-box;

		.icon_wrapper {

			.tags_scroll__box {
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				box-sizing: border-box;
				padding-top: 20px;
				padding-left: 16px;
				min-height: 80px;

				.icon {
					flex-shrink: 0;
					display: flex;
					flex-direction: column;
					justify-content: center;
					box-sizing: border-box;
					align-items: center;
					margin-right: 23px;
					color: #c4c4c4;
					font-size: 32px;

					&:last-child {
						padding-right: 23px;
					}

					&.selected {
						color: #e84545;

						.icon_font {
							color: #484848;
						}
					}
				}
			}
		}
	}


	.icon_font {
		font-size: 10px;
		margin-top: 5px;
		color: gray;

	}
</style>
