<template>
	<view>
		<!-- <button open-type="getUserInfo" @click="login">获取用户信息</button>
		<view class="userinfo">
			<view class="userinfo-avatar">
				<open-data type="userAvatarUrl"></open-data>
			</view>
			<open-data type="userNickName"></open-data>
		</view> -->
		<view class="qiun-columns">
			<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
				<view class="qiun-title-dot-light">柱状图</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts';
	var _self;
	var canvaColumn = null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: ''
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			getServerData() {
				uni.request({
					url: 'https://www.easy-mock.com/mock/5cc586b64fc5576cba3d647b/uni-wx-charts/chartsdata2',
					data: {},
					success: function(res) {
						console.log(res.data.data)
						//下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
						_self.serverData = res.data.data;
						let Column = { categories: [], series: [] };
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Column.categories = res.data.data.Column.categories;
						//这里的series数据是后台做好的，如果您的数据没有和前面我注释掉的格式一样，请自行拼接数据
						Column.series = res.data.data.Column.series;
						_self.showColumn("canvasColumn", Column);
					},
					fail: () => {
						console.log("网络错误，小程序端请检查合法域名");
					},
				});
			},
			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					legend: true,
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
						}
					}
				});
			},
			changeData() {
				canvaColumn.updateData({
					series: _self.serverData.ColumnB.series,
					categories: _self.serverData.ColumnB.categories
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F2F2F2;
		width: 750upx;
		overflow-x: hidden;
	}

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	/* 通用样式 */
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.userinfo {
		position: relative;
		width: 750rpx;
		height: 320rpx;
		color: black;
		font-weight: 600;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.userinfo-avatar {
		overflow: hidden;
		display: block;
		width: 120rpx;
		height: 120rpx;
		margin: 20rpx;
		margin-top: 50rpx;
		border-radius: 50%;
		border: 2px solid #fff;
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
	}
</style>
