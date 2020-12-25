<template>
	<view>
		<button @click="loginByWeixin">微信登录</button>
	</view>
</template>

<script>
	import wxLogin from '@/lib/weixinlogin'
	let weixinAuthService
	export default {
		onLoad() {
			wxLogin()
		},
		// methods: {
		// 	getWeixinCode() {
		// 		return new Promise((resolve, reject) => {
		// 			uni.login({
		// 				provider: 'weixin',
		// 				success(res) {
		// 					resolve(res.code)
		// 				},
		// 				fail(err) {
		// 					reject(new Error('微信登录失败'))
		// 				}
		// 			})
		// 		})
		// 	},
		// 	loginByWeixin() {
		// 		this.getWeixinCode().then((code) => {
		// 			console.log(code)
		// 			return uniCloud.callFunction({
		// 				name: 'login-by-weixin',
		// 				data: {code}
		// 			})
		// 		}).then((res) => {
		// 			console.log(res)
		// 			uni.showModal({
		// 				showCancel: false,
		// 				content: JSON.stringify(res.result.message)
		// 			})
		// 			if (res.result.code === 0) {
		// 				uni.setStorageSync('uni_id_token', res.result.token)
		// 			}
		// 		}).catch(() => {
		// 			uni.showModal({
		// 				showCancel: false,
		// 				content: '微信登录失败，请稍后再试'
		// 			})
		// 		})
		// 	}
		// }
	}
</script>

<style lang="scss">

</style>
