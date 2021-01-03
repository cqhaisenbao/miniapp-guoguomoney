<template>
	<view>
		<monthStatistics v-if="recordList" :nowmonth.sync="nowmonth" :amount_pay="amount_pay" :amount_income="amount_income"></monthStatistics>
		<typeSelect :selectedType.sync='selectedType'></typeSelect>
		<typeProgress></typeProgress>
		<!-- <canvasBar :nowmonth='nowmonth' ></canvasBar> -->
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import { mapState, mapMutations, mapActions } from 'vuex';
	import selectedListAmount from '@/lib/selectedListAmount.js'
	export default {
		data() {
			return {
				nowmonth: dayjs().format('YYYY年MM月'),
				selectedType: '-',
				amount_pay: 0,
				amount_income: 0,
				currentlist_pay: [],
				currentlist_income: []
			}
		},
		computed: {
			...mapState(['recordList']),
		},
		watch: {
			recordList() {
				selectedListAmount.call(this, this.nowmonth, '-')
				console.log('recordList变了',this.currentlist_income)
			},
			nowmonth() {
				selectedListAmount.call(this, this.nowmonth, '-')
			}
		},
		created() {
			selectedListAmount.call(this, this.nowmonth, '-')
		},
	};
</script>

<style scoped>

</style>
