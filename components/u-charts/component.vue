<template>
	<view>
		<canvas v-show="canvasShow" :id="canvasId" :canvasId="canvasId" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px',
	 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" @error="error">
		</canvas>
		<u-line color="#E6E6E6" length='90%' margin='60rpx auto 30rpx' />
	</view>
</template>

<script>
	import uCharts from './u-charts.js';
	var canvases = {};

	export default {
		props: {
			nowmonth: {
				type: String
			},
			newdata: {
				type: Object
			},
			canvasShow: {
				default:true
			},
			chartShouldupdate: {
				type: Boolean
			},
			chartType: { default: 'line' },
			opts: {
				required: true,
				default () {
					return null;
				},
			},
			canvasId: { default: 'u-canvas', },
			cWidth: { default: uni.upx2px(750), },
			cHeight: { default: uni.upx2px(500), },
			pixelRatio: { default: 1, },
		},
		mounted() {
			this.initLineChart()
		},
		computed: {
			newdata_() {
				return this.newdata
			}
		},
		watch: {
			chartShouldupdate() {
				// console.log('this.newdata_', this.newdata_)
				this.changeData('u-canvas', this.newdata_)
			}
		},
		methods: {
			initLineChart() {
				canvases[this.canvasId] = new uCharts({
					$this: this,
					canvasId: this.canvasId,
					type: 'line',
					fontSize: 11,
					legend: {
						show: false
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					categories: this.opts.categories,
					series: this.opts.series,
					padding: [15, 15, 20, -20],
					animation: true,
					enableScroll: true,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8,
						disableGrid: true,
						calibration: true,
						itemCount: 15,
						scrollShow: false
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						data: {
							disabled: false,
						},
						format: (val) => {
							return val.toFixed(0) + '元'
						}
					},
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,

					extra: {
						line: {
							type: 'straight',
							width: 1
						},
						tooltip: {}
					}
				});
			},
			// 这里仅作为示例传入两个参数，cid为canvas-id,newdata为更新的数据，需要更多参数请自行修改
			changeData(cid, newdata) {
				canvases[cid].updateData({
					series: newdata.series,
					categories: newdata.categories
				});
			},
			touchStart(e) {
				const month = this.nowmonth
				canvases[this.canvasId].showToolTip(e, {
					format: function(item, category) {
						return month + category + '日' + ' ' + item.name + '：' + item.data + '元'
					}
				});
				canvases[this.canvasId].scrollStart(e);
			},
			touchMove(e) {
				canvases[this.canvasId].scroll(e);
			},
			touchEnd(e) {
				canvases[this.canvasId].scrollEnd(e);
			},
			error(e) {
				console.log(e)
			}
		},
	};
</script>

<style lang="scss" scoped>
	.charts {
		width: 100%;
		height: 100%;
		flex: 1;
		background-color: #FFFFFF;
	}
</style>
