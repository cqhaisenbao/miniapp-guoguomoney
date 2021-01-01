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
					<view @click="addtag" class="iconfont icon-tianjiazc icon">
						<text class="icon_font">新增分类</text>
					</view>
				</view>
			</scroll-view>
		</view>
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
				tagid:'',
				item:{},
				show: false,
				content: '删除后，当前分类下的内容将归为“其他”分类'
			};
		},
		methods: {
			confirm() {
				const db = uniCloud.database();
				db.collection('income').doc(this.tagid).remove().then((res) => {
					// uni.showToast({
					// 	title:'删除成功',
					// 	icon:'none'
					// })
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
				this.item=item
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
					width: 41px;
					flex-shrink: 0;
					display: flex;
					flex-direction: column;
					justify-content: center;
					box-sizing: border-box;
					align-items: center;
					margin-right: 16px;
					color: #c4c4c4;
					font-size: 32px;

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

	.icon-tianjiazc {
		width: 57px !important;
		padding-right: 16px;
	}
</style>
