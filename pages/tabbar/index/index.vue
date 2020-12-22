<template>
	<view>
		<view class="content">
			<tabs :data_source="recordTypeList" :value.sync="record.type"></tabs>
			父组件的记录:{{record.type}}{{record.tag}}{{record.amount}}
			<tags class="tags" :iconName='iconName' :selectedTag.sync="record.tag"></tags>
			<keybord :value.sync="record.amount" :tag.sync="record.tag"></keybord>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selected: false,
				iconName: [],
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
					tag: '',
					notes: '',
					type: '-',
					amount:''
				},
			};
		},
		created() {
			this.getIcon()
		},
		methods: {
			getIcon() {
				uni.showLoading({
					title: '加载中'
				})
				uniCloud.callFunction({
					name: 'get-income-icon'
				}).then((res) => {
					uni.hideLoading()
					const { result } = res
					this.iconName = result.data
				})
			}
		},
	};
</script>

<style lang="scss">
	.content {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.tags {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			margin-bottom: 5px;
		}
	}
</style>
