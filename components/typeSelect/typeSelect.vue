<template>
	<view>
		<view class="header_">
			<text class="header_left">收支构成</text>
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
		props:{
			selectedType: ''
		},
		data() {
			return {
				data_source: [{ text: '支出', value: '-' }, { text: '收入', value: '+' }],
			};
		},
		methods: {
			selectType(item) {
				this.$emit('update:selectedType', item.value);
			},
		}
	}
</script>

<style lang="scss" scoped>
.header_ {
		padding: 35px 12px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.header_left {
			font-size: 17px;
			color: #555555;
		}

		.header_right {
			font-size: 14px;
			color: #777777;

			.button_ {
				background-color: #FAFAFA;
				padding: 6px 12px;
				border-radius: 3px;
				margin-right: 8px;

				&:first-child.selected {
					color: $main-color;
					background-color: lighten($main-color, 40%);
				}

				;

				&:last-child.selected {
					color: $uni-color-warning;
					background-color: lighten($uni-color-warning, 35%);
				}
			}
		}
	}
</style>
