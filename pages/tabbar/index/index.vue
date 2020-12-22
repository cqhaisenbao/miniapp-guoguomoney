<template>
	<view class="content">
		<tabs :data_source="recordTypeList" :value.sync="record.type"></tabs>
		<tags :iconName='iconName' :selectedTag.sync="selectedTag"></tags>
		父组件的tag{{selectedTag}}
		<keybord></keybord>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selected: false,
				iconName: [],
				selectedTag:"",
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
		created() {
			this.getIcon()
		},
		methods: {
			getIcon() {
				uni.showLoading({
					title:'加载中'
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
	// .content {
	// 	display: flex;
	// 	flex-direction: column;
	// 	align-items: center;
	// 	justify-content: center;
	// }

</style>
