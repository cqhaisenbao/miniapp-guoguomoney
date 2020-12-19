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
</style>
