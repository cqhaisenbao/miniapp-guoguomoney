<template>
	<view>
		<monthStatistics :nowmonth.sync="nowmonth"></monthStatistics>
		<canvasBar :nowmonth='nowmonth' :selectedType.sync='selectedType'></canvasBar>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	export default {
		data() {
			return {
				nowmonth: dayjs().format('YYYY年MM月'),
				selectedType: '-'
			}
		}
	};
</script>

<style scoped>

</style>
