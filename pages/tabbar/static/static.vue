<template>
	<view class="home">
			<u-popup v-model="show" mode="bottom" border-radius="20" height="60%" closeable=true>
				<view></view>
			</u-popup>
			<u-button type="success" @click="showpop">打开弹出层</u-button>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				show: false
			}
		},
		watch: {
			show() {
				if (!this.show) {
					uni.showTabBar()
				}
			}
		},
		methods: {
			showpop() {
				this.show = true
				uni.hideTabBar()
			}
		}
	}
</script>

<style lang="scss">
	
</style>
