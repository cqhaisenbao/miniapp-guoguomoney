<template>
	<view class="content">
		<tabs :data_source="recordTypeList" :value.sync="record.type"></tabs>
		<tags :iconName='iconName' :selectedTag.sync="selectedTag"></tags>
		爸爸的tag{{selectedTag}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selected: false,
				iconName: [],
				selectedTag:"交通",
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
				uniCloud.callFunction({
					name: 'get-income-icon'
				}).then((res) => {
					const { result } = res
					this.iconName = result.data
					console.log(this.iconName)
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
