<template>
	<view>
		<view @click="showdata" class="dateWrapper">
			{{ now }}
			<text class="text_">▼</text>
		</view>
		<u-calendar v-model="show" @change="change" :mode="mode" btn-type='success' active-bg-color='#3EB575'></u-calendar>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	export default {
		props:{
			now:{
				type:String
			}
		},
		data() {
			return {
				mode: 'date',
				show: false,
			};
		},
		methods: {
			showdata() {
				this.show = true
			},
			change(value) {
				this.$emit('timeupdate', value.result);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dateWrapper {
		background: #e8e8e8;
		display: inline-block;
		padding: 6rpx 30rpx;
		border-radius: 40rpx;
		font-size: 26rpx;
		font-weight: 600;
		margin-right: 20rpx;

		.text_ {
			margin-left: 6rpx;
			color: #bfbdbd;
		}
	}
</style>
