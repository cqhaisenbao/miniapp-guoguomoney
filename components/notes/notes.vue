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
		data() {
			return {};
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
		font-size: 14px;
		padding-left: 16px;
		display: flex;
		align-items: center;

		.label_ {
			flex-grow: 1;
			display: flex;
			align-items: center;
			padding: 10px 0;
		}

		// >view {
		// 	flex-shrink: 0;
		// }

		.name {}

		.input_content {
			height: 40px;
			flex-grow: 1;
			background: transparent;
			border: none;
			margin-left: 10px;
		}
	}
</style>
