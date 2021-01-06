import { mapState, mapMutations, mapActions } from 'vuex';

let weixinAuthService

async function wxLogin() {
	uni.showLoading({
		title: '加载中',
	});
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
				uni.hideLoading();
				uni.setStorageSync('uni_id_token', res.result.token)
				this.$store.dispatch('fetchIconName')
				this.$store.dispatch('fetchRecordList')
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
