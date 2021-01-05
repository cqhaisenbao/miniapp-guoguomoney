<template>
	<view>
		<view class="header_">
			<text class="header_left">{{title}}</text>
			<view class='header_right'>
				<text v-for="item in data_source" class="button_" :key="item.value" :class="{selected: item.value=== selectedType}" @click="selectType(item)">
					{{ item.text }}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			selectedType: '',
			line_selectedType:'',
			title:{
				default:'收支构成'
			}
		},
		data() {
			return {
				data_source: [{ text: '支出', value: '-' }, { text: '收入', value: '+' }],
			};
		},
		methods: {
			selectType(item) {
				this.$emit('update:selectedType', item.value);
				this.$emit('update:line_selectedType', item.value);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.header_ {
		padding: 70rpx 24rpx 50rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.header_left {
			font-size: 34rpx;
			color: #555555;
		}

		.header_right {
			font-size: 28rpx;
			color: #777777;

			.button_ {
				background-color: #FAFAFA;
				padding: 12rpx 24rpx;
				border-radius: 6rpx;
				margin-right: 16rpx;

				&:first-child.selected {
					color: $main-color;
					background-color: lighten($main-color, 40%);
				}

				&:last-child.selected {
					color: $uni-color-warning;
					background-color: lighten($uni-color-warning, 35%);
				}
			}
		}
	}
</style>
