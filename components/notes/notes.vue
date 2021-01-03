<template>
	<view>
		<view class="formWrapper">
			<view class="formItem">
				<label class="label_">
					<text class="name">{{ fieldName }}</text>
					<input class="input_content" type="text" :value="value" @change="onValueChanged($event.target.value)" :placeholder="placeholder">
				</label>
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: String,
				default: ''
			},
			fieldName: {
				type: String,
				required: true
			},
			placeholder: {
				type: String,
				default: ''
			}
		},
		methods:{
			onValueChanged(value){
				 this.$emit('update:value', value);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.formItem {
		font-size: 28rpx;
		padding-left: 32rpx;
		display: flex;
		align-items: center;

		.label_ {
			flex-grow: 1;
			display: flex;
			align-items: center;
			padding: 20rpx 0;
		}

		.input_content {
			height: 80rpx;
			flex-grow: 1;
			background: transparent;
			border: none;
			margin-left: 20rpx;
		}
	}
</style>
