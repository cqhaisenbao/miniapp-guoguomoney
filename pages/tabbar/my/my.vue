<template>
	<view>
		<monthStatistics :nowmonth.sync="nowmonth"></monthStatistics>
		<uni-ec-canvas class="uni-ec-canvas" id="pie-chart" canvas-id="multi-charts-pie" :ec="ec2"></uni-ec-canvas>
	</view>
</template>

<script>
	import uniEcCanvas from "@/components/uni-ec-canvas/uni-ec-canvas";
	import dayjs from 'dayjs'
	import { mapState, mapMutations, mapActions } from 'vuex';
	import objArrtransArr from '@/lib/objArrtransArr.js';
	export default {
		components: { uniEcCanvas },
		data() {
			return {
				datalist: [],
				nowmonth: dayjs().format('YYYY年MM月'),
				ec2: {
					option: {
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'shadow'
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							top: 20,
							containLabel: true
						},
						xAxis: {
							type: 'value',
							boundaryGap: ['20%', '20%'],
							splitLine: {
								show: false
							},
							axisLabel: {
								show: false
							},
						},
						yAxis: {
							type: 'category',
							axisLine: {
								show: false
							},
							axisLabel: {
								fontSize: 14,
							},
							axisTick: {
								show: false
							},
							data: [],
							min: -6,
						},
						series: [{
							type: 'bar',
							barWidth: "30%",
							itemStyle: {
								barBorderRadius: 5,
								color: "rgba(62, 181, 117, 1)",
								borderWidth: 5,
								borderColor: "rgba(62, 181, 117, 1)"
							},
							label: {
								show: true,
								position: 'right',
								formatter: '￥{c}',
								textStyle: {
									color: '#a2a2a2',
									fontSize: 12,
								}
							},
							data: []
						}, ]
					},
				}
			};
		},
		computed: {
			...mapState(['recordList'])
		},
		created() {
			this.fetchList()
		},
		watch: {
			nowmonth() {
				this.datalist = []
				this.fetchList()
			},
			recordList() {
				this.datalist = []
				this.fetchList()
			}
		},
		methods: {
			fetchList() {
				const list = this.recordList
				const currenttime = this.nowmonth
				for (let i = 0; i < list.length; i++) {
					let time = dayjs(list[i].time).format('YYYY年MM月')
					if (list[i].type === '-' && time === this.nowmonth) {
						this.datalist.push({
							name: list[i].tag,
							value: list[i].amount
						})
					}
				}
				console.log(this.datalist)
				let newrecordList = []
				this.datalist.forEach(el => {
					const result = newrecordList.findIndex(ol => { return el.name === ol.name })
					if (result !== -1) {
						newrecordList[result].value = newrecordList[result].value + el.value
					} else {
						newrecordList.push(el)
					}
				})
				console.log(newrecordList)
				const data = objArrtransArr(newrecordList, "name", "value");
				const yname = data.nameArr
				const num = data.numArr
				// console.log('yname', yname)
				// console.log('num', num)
				this.ec2.option.series[0].data = num
				this.ec2.option.yAxis.data = yname
			}
		}
	};
</script>

<style scoped>
	.uni-ec-canvas {
		width: 750upx;
		height: 750upx;
		display: block;
	}
</style>
