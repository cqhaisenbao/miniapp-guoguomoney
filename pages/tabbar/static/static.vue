<template>
	<view>
		<button @click="loginByWeixin">微信登录</button>
	</view>
</template>

<script>
	let weixinAuthService
	export default {
		methods: {
			getWeixinCode() {
				return new Promise((resolve, reject) => {
					uni.login({
						provider: 'weixin',
						success(res) {
							resolve(res.code)
						},
						fail(err) {
							reject(new Error('微信登录失败'))
						}
					})
				})
			},
			loginByWeixin() {
				this.getWeixinCode().then((code) => {
					console.log(code)
					return uniCloud.callFunction({
						name: 'login-by-weixin',
						data: {code}
					})
				}).then((res) => {
					uni.showModal({
						showCancel: false,
						content: JSON.stringify(res.result)
					})
					if (res.result.code === 0) {
						uni.setStorageSync('uni_id_token', res.result.token)
					}
				}).catch(() => {
					uni.showModal({
						showCancel: false,
						content: '微信登录失败，请稍后再试'
					})
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
