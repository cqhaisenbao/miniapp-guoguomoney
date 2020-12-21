<template>
	<view class="content">
		<tabs :data_source="recordTypeList" :value.sync="record.type"></tabs>
		<view class="iconfont icon-icon8" :class="{selected:selected}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selected: false,
				title: '果果记账',
				recordTypeList: [{
						text: '支出',
						value: '-',
					},
					{
						text: '收入',
						value: '+',
					},
				],
				record: {
					tags: [],
					notes: '',
					type: '-',
				},
			};
		},
		onLoad() {},
		methods: {},
	};
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.iconfont {
		font-size: 25px;

		&.selected {
			color: #18B566;
		}
	}
</style>
