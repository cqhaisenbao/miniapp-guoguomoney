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
			console.log(res)
			if (res.result.code === 0) {
				uni.setStorageSync('uni_id_token', res.result.token)
			}
		}).catch((err) => {
			console.log('err', err)
			uni.showModal({
				showCancel: false,
				content: '微信登录失败，请尝试重新进入小程序'
			})
		})
	})()
}

export default wxLogin
