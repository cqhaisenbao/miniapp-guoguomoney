<template>
	<view>
		<u-modal confirm-color="#3EB575" @confirm="confirm" show-cancel-button="true" v-model="show" :content="content"></u-modal>
		<view v-if="iconName.length>0" class="tags">
			<scroll-view show-scrollbar=false class="icon_wrapper" scroll-x>
				<view class="tags_scroll__box">
					<view v-if="item.default && item.type===type" v-for="(item,index) in iconName" :key="index" :class='[item.name,{selected:selectedTag===item.title?true:false}]' class="icon" @click="toggle(item)">
						<text class="icon_font">{{item.title}}</text>
					</view>
					<view @longpress='editusertag(item)' v-if="!item.default && item.type===type" v-for="(item,index) in iconName" :key="index" :class='[item.name,{selected:selectedTag===item.title?true:false}]' class="icon" @click="toggle(item)">
						<text class="icon_font">{{item.title}}</text>
					</view>
					<view v-if="addtagshow" @click="addtag" class="iconfont icon-tianjiazc icon">
						<text class="icon_font">新增分类</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapActions } from 'vuex';
	export default {
		props: {
			type: '',
			selectedTag: '',
			tagName: '',
			popshow: false,
			addtagshow: {
				default: true
			}
		},
		computed: {
			...mapState(['iconName'])
		},
		data() {
			return {
				selectedTags: [],
				tagid: '',
				item: {},
				show: false,
				content: '删除后，当前分类下的内容将归为“其他”分类'
			};
		},
		methods: {
			confirm() {
				const db = uniCloud.database();
				db.collection('income').doc(this.tagid).remove().then((res) => {
					this.$store.dispatch('fetchIconName')
					this.$emit('deletetag', this.item)
				})
			},
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
				this.item = item
				this.tagid = item._id
				this.show = true;
			}
		}
	}
</script>

<style lang="scss">
	.tags {
		width: 100%;
		box-sizing: border-box;
		// padding-right: 16px;

		.icon_wrapper {

			.tags_scroll__box {
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				box-sizing: border-box;
				padding-top: 40rpx;
				padding-left: 32rpx;
				min-height: 80px;

				.icon {
					width: 41px;
					flex-shrink: 0;
					display: flex;
					flex-direction: column;
					justify-content: center;
					box-sizing: border-box;
					align-items: center;
					margin-right: 32rpx;
					color: #c4c4c4;
					font-size: 64rpx;

					&.selected {
						color: $uni-color-warning;

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

	.icon-tianjiazc {
		width: 57px !important;
		padding-right: 16px;
	}
</style>
