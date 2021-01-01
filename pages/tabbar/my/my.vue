<template>
	<view>
		<monthStatistics></monthStatistics>
		<!-- <uni-ec-canvas class="uni-ec-canvas" id="pie-chart" canvas-id="multi-charts-pie" :ec="ec2"></uni-ec-canvas> -->
	</view>
</template>

// <script>
// 	import uniEcCanvas from "@/components/uni-ec-canvas/uni-ec-canvas";
// 	export default {
// 		components: { uniEcCanvas },
// 		data() {
// 			return {
// 				recordList: [],
// 				ec2: {
// 					option: {
// 						tooltip: {
// 							trigger: 'axis',
// 							axisPointer: {
// 								type: 'shadow'
// 							}
// 						},
// 						grid: {
// 							left: '3%',
// 							right: '4%',
// 							bottom: '3%',
// 							containLabel: true
// 						},
// 						xAxis: {
// 							type: 'value',
// 							splitLine: {
// 								show: false
// 							},
// 							axisLabel: {
// 								show: false
// 							}
// 						},
// 						yAxis: {
// 							type: 'category',
// 							axisLine: {
// 								show: false
// 							},
// 							axisTick: {
// 								show: false
// 							},
// 						},
// 						series: [{
// 							type: 'bar',
// 							 barWidth: "18%",
// 							 barCategoryGap: "13%",
// 							 itemStyle: {
// 							      barBorderRadius: 5,
// 							     },
// 							data: []
// 						}, ]
// 					},
// 				}
// 			};
// 		},
// 		created() {
// 			this.fetchList()
// 		},
// 		methods: {
// 			fetchList() {
// 				const db = uniCloud.database();
// 				db.collection('recordList').where('uid==$env.uid && type=="-"').field('amount,tag').get().then(res => {
// 					const datalist = res.result.data
// 					for (let i = 0; i < datalist.length; i++) {
// 						this.recordList.push({
// 							name: datalist[i].tag,
// 							value: datalist[i].amount
// 						})
// 					}
// 					console.log(this.recordList)
// 					let newrecordList = []
// 					this.recordList.forEach(el => {
// 						const result = newrecordList.findIndex(ol => { return el.name === ol.name })
// 						if (result !== -1) {
// 							newrecordList[result].value = newrecordList[result].value + el.value
// 						} else {
// 							newrecordList.push(el)
// 						}
// 					})
// 					console.log(newrecordList)
// 					this.ec2.option.series[0].data = newrecordList
// 				})
// 			}
// 		}
// 	};
// </script>

<style scoped>
	.uni-ec-canvas {
		width: 750upx;
		height: 750upx;
		display: block;
	}
</style>
