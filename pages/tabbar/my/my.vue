<template>
	<view>
		<monthStatistics v-if="recordList" :nowmonth.sync="nowmonth" :amount_pay="amount_pay" :amount_income="amount_income"></monthStatistics>
		<typeSelect :selectedType.sync='selectedType'></typeSelect>
		<typeProgress :selectedType='selectedType' :currentlist="selectedList_norepeat" :currentAmount="currentAmount" :amount_income="amount_income"></typeProgress>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import { mapState, mapMutations, mapActions } from 'vuex';
	import selectedListAmount from '@/lib/selectedListAmount.js'
	import selectedMonthAmount from '@/lib/selectedMonthAmount.js'
	export default {
		data() {
			return {
				nowmonth: dayjs().format('YYYY年MM月'),
				selectedType: '-',
				amount_pay: 0,
				amount_income: 0,
				currentAmount: 0,
				selectedList: [],
				selectedList_norepeat: []
			}
		},
		computed: {
			...mapState(['recordList']),
			listenChange() {
				const { recordList, nowmonth, selectedType } = this
				return { recordList, nowmonth, selectedType }
			}
		},
		watch: {
			listenChange() {
				selectedListAmount.call(this, this.nowmonth, this.selectedType)
				selectedMonthAmount.call(this, this.nowmonth, '-')
				this.handleCurrentList()
			}
		},
		created() {
			selectedListAmount.call(this, this.nowmonth, this.selectedType)
			selectedMonthAmount.call(this, this.nowmonth, '-')
			this.handleCurrentList()
		},
		methods: {
			handleCurrentList() {
				this.selectedList = []
				const list = this.recordList
				const currenttime = this.nowmonth
				for (let i = 0; i < list.length; i++) {
					let time = dayjs(list[i].time).format('YYYY年MM月')
					if (list[i].type === this.selectedType && time === this.nowmonth) {
						// this.selectedList.push(list[i])
						this.selectedList.push({
							tag: list[i].tag,
							amount: list[i].amount,
							tagName: list[i].tagName,
							type: list[i].type
						})
					}
				}
				//重复类型金额相加后的表：selectedList_norepeat
				const newRecordList = []
				this.selectedList.forEach(el => {
					const result = newRecordList.findIndex(ol => { return el.tag === ol.tag })
					if (result !== -1) {
						newRecordList[result].amount = newRecordList[result].amount + el.amount
					} else {
						newRecordList.push(el)
					}
				})
				this.selectedList_norepeat = newRecordList
			}
		}
	};
</script>

<style scoped>

</style>
