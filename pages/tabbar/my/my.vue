<template>
	<view>
		<monthStatistics v-if="recordList" :nowmonth.sync="nowmonth" :amount_pay="amount_pay" :amount_income="amount_income"></monthStatistics>
		<typeProgress :selectedList='selectedList' :selectedType='selectedType' :currentlist="selectedList_norepeat" :currentAmount="currentAmount" :amount_income="amount_income">
			<typeSelect :selectedType.sync='selectedType'></typeSelect>
		</typeProgress>
		<view>
			<block v-for="(item, index) in arr" :key="index">
				<view class="qiun-columns" style="background-color: #FFFFFF;">
					<u-charts :canvas-id="item.id" :chartType="item.chartType" :cWidth="cWidth" :cHeight="cHeight" :opts="item.opts" :ref="item.id" />
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	import uCharts from '@/components/u-charts/component.vue';
	import { isJSON } from '@/common/checker.js';
	import dayjs from 'dayjs';
	import { mapState, mapMutations, mapActions } from 'vuex';
	import selectedListAmount from '@/lib/selectedListAmount.js';
	import selectedMonthAmount from '@/lib/selectedMonthAmount.js';
	import networkcheck from '@/lib/networkcheck.js';
	var _self;
	export default {
		components: { uCharts },
		data() {
			return {
				nowmonth: dayjs().format('YYYY年MM月'),
				selectedType: '-',
				amount_pay: 0,
				amount_income: 0,
				currentAmount: 0,
				selectedList: [],
				selectedList_norepeat: [],
				textarea: '',
				cWidth: '',
				cHeight: '',
				arr: [],
				chartData: {
					categories: [],
					series: [{
						name: '支出',
						data: [],
						color: '#3EB575'
					}]
				}
			}
		},
		onShow() {
			networkcheck.call(this)
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
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
			getServerData() {
				let LineA = {
					categories: [],
					series: [],
				};
				LineA.categories = this.chartData.categories;
				LineA.series = this.chartData.series;

				// _self.textarea = JSON.stringify(res.data.data.LineA);

				let serverData = [{
					opts: LineA,
					chartType: "line",
					id: "abcc"
				}];
				_self.arr = serverData;
			},
			handleCurrentList() {
				this.chartData.series[0].data = []
				this.chartData.categories = []
				this.selectedList = []
				const list = this.recordList
				const currenttime = this.nowmonth
				for (let i = 0; i < list.length; i++) {
					let time = dayjs(list[i].time).format('YYYY年MM月')
					if (list[i].type === this.selectedType && time === this.nowmonth) {
						this.selectedList.push({
							tag: list[i].tag,
							amount: list[i].amount,
							tagName: list[i].tagName,
							type: list[i].type,
							//如果异常就是这句有问题
							time: dayjs(list[i].time).format('D')
						})
					}
				}
				//同一天的表
				const fn_list = this.selectedList.map(r => _.pick(r, ['time', 'amount']))
				console.log('fn_list', fn_list)
				const oneDayList = []
				fn_list.forEach(el => {
					const result = oneDayList.findIndex(ol => { return el.time === ol.time })
					if (result !== -1) {
						oneDayList[result].amount = oneDayList[result].amount + el.amount
					} else {
						oneDayList.push(el)
					}
				})
				// console.log('oneDayList', oneDayList)
				const daysArray = []
				const x = _.replace(_.replace(this.nowmonth, '年', ''), '月', '')
				const days = dayjs(x).daysInMonth()
				console.log('这个月有多少天', days)
				for (let i = 1; i < days + 1; i++) {
					const date = dayjs().date(i).format('D')
					const found = _.find(oneDayList, { time: date })
					daysArray.push({ date: i, amount: found ? found.amount : 0 })
				}
				const times = daysArray.map(item => item.date)
				const amounts = daysArray.map(item => item.amount)
				this.chartData.series[0].data = amounts
				this.chartData.categories = times
				console.log('chartData', this.chartData.series[0].data)

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

<style lang="scss" scoped>
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
	}
</style>
