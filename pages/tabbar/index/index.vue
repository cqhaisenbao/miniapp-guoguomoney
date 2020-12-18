<template>
	<view class="content">
		<tabs :data_source="recordTypeList" :value.sync="record.type"></tabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '果果记账',
				recordTypeList: [{
						text: '支出',
						value: '-'
					},
					{
						text: '收入',
						value: '+'
					},
				],
				record: {
					tags: [],
					notes: '',
					type: '-'
				}
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
