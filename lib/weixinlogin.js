import { mapState, mapMutations, mapActions } from 'vuex';

let weixinAuthService

async function wxLogin() {
	uni.showLoading({ title: '加载中' });
	try {
		let [rest, { code }] = await uni.login({ provider: 'weixin' })
		let { result } = await uniCloud.callFunction({
			name: 'login-by-weixin',
			data: { code }
		})
		let { code: unicode, token } = result
		if (unicode === 0) {
			uni.hideLoading();
			uni.setStorageSync('uni_id_token', token)
			this.$store.dispatch('fetchIconName')
			this.$store.dispatch('fetchRecordList')
			return result
		}
	} catch (e) {
		console.log('err', err)
		uni.showModal({
			showCancel: false,
			content: '微信登录失败，请尝试重新进入小程序'
		})
	}
}

export default wxLogin