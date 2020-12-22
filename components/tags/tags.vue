<template>
	<view class="tags">
		<scroll-view class="icon_wrapper" scroll-x>
			<view class="tags_scroll__box">
				<view v-for="(item,index) in iconName" :key="index" :class='[item.name,{selected:selectedTag===item.title?true:false}]' class="icon" @click="toggle(item)">
					<text class="icon_font">{{item.title}}</text>
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
			selectedTag: {
				type: String
			}
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
			}
		}
	}
</script>

<style lang="scss">
	.tags {
		width: 100%;
		box-sizing: border-box;

		.icon_wrapper {
			min-height: 80px;
			.tags_scroll__box {
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				box-sizing: border-box;
				padding-top: 20px;
				padding-left: 20px;

				.icon {
					flex-shrink: 0;
					display: flex;
					flex-direction: column;
					justify-content: center;
					box-sizing: border-box;
					align-items: center;
					padding-right: 20px;
					color: #c4c4c4;
					font-size: 30px;

					&.selected {
						color: #e84545;
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
