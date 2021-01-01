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
							containLabel: true
						},
						xAxis: {
							type: 'value',
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
							axisTick: {
								show: false
							},
							data: [],
							min: -6,
						},
						series: [{
							type: 'bar',
							barWidth: "50%",
							itemStyle: {
								barBorderRadius: 8,
								color: "rgba(62, 181, 117, 1)"
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
				// this.ec2.option.series[0].data = []
				// this.ec2.option.yAxis.data =[]
				this.datalist=[]
				this.fetchList()
			}
		},
		methods: {
			objArrtransArr(arr, oldname, oldnum) {
				var nameArr = [];
				var numArr = [];
				arr.forEach(item => {
					nameArr.push(item[oldname]);
					numArr.push(item[oldnum]);
				});
				return { nameArr, numArr };
			},
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
				const data = this.objArrtransArr(newrecordList, "name", "value");
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
