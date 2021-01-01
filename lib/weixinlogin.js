let weixinAuthService

async function wxLogin() {
	const getWeixinCode = () => {
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
	};
	const loginByWeixin = (() => {
		getWeixinCode().then((code) => {
			return uniCloud.callFunction({
				name: 'login-by-weixin',
				data: { code }
			})
		}).then((res) => {
			if (res.result.code === 0) {
				this.$store.commit('changeisLogin', true);
				uni.setStorageSync('uni_id_token', res.result.token)
			}
		}).catch((err) => {
			console.log('err', err)
			// uni.showModal({
			// 	showCancel: false,
			// 	content: '微信登录失败，请稍后再试'
			// })
		})
	})()
}

export default wxLogin
