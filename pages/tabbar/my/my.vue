<template>
	<view>
		<view class="container u-skeleton">
			<view style="margin: 20px 0">
				<view v-for="(item,index) in lists" :key="index" class="lists">
					<!--u-skeleton-rect 绘制矩形-->
					<text class="u-skeleton-rect">{{item}}</text>
				</view>
			</view>
		</view>
		<!--引用组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: [
					'君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪。',
					'人生得意须尽欢，莫使金樽空对月',
					'天生我材必有用，千金散尽还复来',
				],
				loading: true, // 是否显示骨架屏组件
			}
		},
		onLoad() {
			// 通过延时模拟向后端请求数据，调隐藏骨架屏
			setTimeout(() => {
				this.loading = false;
			}, 5000)
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx 60rpx;
	}

	.lists {
		margin: 10px 0;
	}
</style>
