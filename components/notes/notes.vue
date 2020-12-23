<template>
	<view>
		<view class="formWrapper">
			<view class="formItem">
				<label>
					<text class="name">{{ fieldName }}</text>
					<input type="text" :value="value" @change="onValueChanged($event.target.value)" :placeholder="placeholder">
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

		label {
			flex-grow: 1;
			display: flex;
			align-items: center;
			padding: 10px 0;
		}

		>view {
			flex-shrink: 0;
		}

		.name {}

		input {
			height: 40px;
			flex-grow: 1;
			background: transparent;
			border: none;
			margin-left: 10px;
		}
	}
</style>
